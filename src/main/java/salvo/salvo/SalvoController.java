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
    private GameRepository repo;
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private SalvoRepository salvoRepository;

    @RequestMapping("/games")
    public List<Object> getAllIds() {
    //this method loops through all the Games and returns only the info I need - using the method below for - id and creation date.
        List<Game> games = repo.findAll();
        List<Object> list = new ArrayList<>();
        for (Game game : games) {
            list.add(makeGameDTO(game));
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
        return dto;
    }

    public Map<String, Object> makeGamePlayerDTO(GamePlayer gamePlayer){
        Map<String, Object> dto = new LinkedHashMap<String, Object>();
        dto.put("id", gamePlayer.getId());
        dto.put("player", makePlayerDTO(gamePlayer.getPlayer()));
        return dto;
    }
    public Map<String, Object> makeShipDTO(Ship ship){
        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("type", ship.getType());
        dto.put("locations", ship.getLocations());
        return dto;
    }
    public List<Object> makeSalvoDTO(GamePlayer gamePlayer){
        List<Object> salvoList = new ArrayList<>();
        Set<Salvo> salvos = gamePlayer.getSalvos();
        for(Salvo salvo: salvos){
            Map<String, Object> dto = new HashMap<>();
            dto.put("gamePlayer-id", salvo.getGamePlayer().getId());
            dto.put("turn", salvo.getTurn());
            dto.put("locations", salvo.getLocations());
            salvoList.add(dto);
        }
        return salvoList;
}

}

