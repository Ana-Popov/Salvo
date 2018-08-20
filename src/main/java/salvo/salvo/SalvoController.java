package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")
public class SalvoController {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private SalvoRepository salvoRepository;
    @Autowired
    private ScoreRepository scoreRepository;

    @RequestMapping("/games")
    public List<Object> getAllIds() {
    //this method loops through all the Games and returns only the info I need - using the method below for - id and creation date.
        List<Game> games = gameRepository.findAll();
        List<Object> list = new ArrayList<>();
        for (Game game : games) {
            list.add(makeGameDTO(game));
        }
        return list;
    }

    @RequestMapping("/leaderboard")
    public List<Object> getLeaderboad(){
        List<Object> list = new ArrayList<>();
        List<Player> players = playerRepository.findAll();
        for (Player player : players) {
          Map<String,Object> map = new LinkedHashMap<>();
           Double total = 0.0;
           Integer win = 0;
           Integer lose = 0;
           Integer tie = 0;
         Set<Score> scores = player.getScores();
         for (Score score : scores) {
            total += score.getScore();
                if (score.getScore() == 1) {
                win++;
                }
                if(score.getScore() > 0 && score.getScore()< 1){
                    tie++;
                }
                if(score.getScore() == 0){
                    lose++;
                }
        }
            map.put("player",player.getUserName());
            map.put("total",total);
            map.put("win",win);
            map.put("tie",tie);
            map.put("lose",lose);

        list.add(map);

        }

    return list;
    }


    @RequestMapping("/game_view/{gamePlayerId}")
    public Map<String, Object> gameView(@PathVariable Long gamePlayerId) {
        Map<String, Object> gameView = new LinkedHashMap<>();
        GamePlayer gamePlayer = gamePlayerRepository.findOne(gamePlayerId);
        gameView.put("user-id",gamePlayer.getId());
        gameView.put("game",makeGameDTO(gamePlayer.getGame()));
        gameView.put("ships",gamePlayer.getShips().stream()
                                                    .map(ship -> getShips(ship))
                                                    .collect(toList()));
        gameView.put("user-salvoes", makeSalvoDTO(gamePlayer));
        gameView.put("opponent-salvoes", makeSalvoDTO(getOpponent(gamePlayer)));

        return gameView;

    }

    public Map<String, Object> getShips(Ship ship){
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("type", ship.getType());
        dto.put("locations", ship.getLocations());
        return dto;
    }
    //this method returns the id and the creation date for one game - the method is used above.
    public Map<String,Object> makeGameDTO(Game game) {
        Map<String,Object> dto = new LinkedHashMap<String, Object>();
        Set<GamePlayer> gamePlayers = game.getGamePlayers();
        dto.put("id",game.getId());
        dto.put("created", game.getDate());
        dto.put("gamePlayers", gamePlayers.stream()
                                .map(gp -> makeGamePlayerDTO(gp))
                                .collect(toList()));
        return dto;
    }

    public Map<String, Object> makePlayerDTO(Player player){
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", player.getId());
        dto.put("email", player.getUserName());
//        dto.put("score", player.getScores().stream()
//                                            .findFirst()
//                                            .orElse(null));
        return dto;
    }

    public Map<String, Object> makeGamePlayerDTO(GamePlayer gamePlayer){
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", gamePlayer.getId());
        dto.put("player", makePlayerDTO(gamePlayer.getPlayer()));
        dto.put("score", makeScoreDto(gamePlayer));
        return dto;
    }

    public Map<String, Object> makeScoreDto(GamePlayer gamePlayer){

            Map<String, Object> dto = new LinkedHashMap<>();
            if (gamePlayer.getScore() != null) {
                dto.put("score", gamePlayer.getScore().getScore());
                dto.put("finishDate", gamePlayer.getScore().getFinishDate());
            }
        return dto;
    }


    public Map<String, Object> makeShipDTO(Ship ship){
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("type", ship.getType());
        dto.put("locations", ship.getLocations());
        return dto;
    }
    public List<Object> makeSalvoDTO(GamePlayer gamePlayer){
        List<Object> list = new ArrayList<>();
        Set<Salvo> salvoes = gamePlayer.getSalvoes();
        for(Salvo salvo: salvoes){
            Map<String, Object> dto = new HashMap<>();
            dto.put("gamePlayer-id", salvo.getGamePlayer().getId());
            dto.put("turn", salvo.getTurn());
            dto.put("locations", salvo.getLocations());
            list.add(dto);
        }
        return list;
}

public GamePlayer getOpponent(GamePlayer gamePlayer){
        return gamePlayer.getGame().getGamePlayers().stream()
                .filter(gp -> gp != gamePlayer)
                .findFirst()
                .orElse(null);
}

//
//@RequestMapping("/books")
//    public List<Object> scorres () {
//        List<Object> list = new ArrayList<>();
//        List<Score> scoresList = scoreRepository.findAll();
//
//    for (Score score : scoresList) {
//        Map<String,Object> scoreMap = new HashMap<>();
//        scoreMap.put("score", score.getScore());
//        scoreMap.put("player", score.getPlayer());
//        list.add(scoreMap);
//    }
//    return list;
//}
}
