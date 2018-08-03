package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String userName;

    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<GamePlayer> gamePlayers;

    @OneToMany(mappedBy = "player", fetch = FetchType.EAGER)
    Set<Score> scores;

    public void addGamePlayers(GamePlayer gamePlayer){
        gamePlayer.setPlayer(this);
        gamePlayers.add(gamePlayer);
    }
    @JsonIgnore
    public List<Game> getGame(){
        return gamePlayers.stream().map(sub -> sub.getGame()).collect(toList());
    }


    public Player(){}
;
    public Player (String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public long getId() {
        return id;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public void setGamePlayers(Set<GamePlayer> gamePlayers) {
        this.gamePlayers = gamePlayers;
    }

    public Set<Score> getScores() {
        return scores;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }
    public  Score getScore (Game game) {
//        List<Score> scoreList = new ArrayList<>();
//        for (Score score : scores) {
//            if (score.getGame() == game) {
//                scoreList.add(score);
//            }
//        }
//        if (!scoreList.isEmpty()) {
//            return scoreList.get(0);
//        } else {
//            return null;
//        }

        return scores.stream().filter(score -> score.getGame() == game).findFirst().orElse(null);

    }
}//end



