package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Size(min = 5, message = "Email should have at least 5 characters", max = 100)
//    @Email(message = "Please provide an email address")
//    @Pattern(regexp="^([a-zA-Z0-9\\-\\.\\_]+)'+'(\\@)([a-zA-Z0-9\\-\\.]+)'+'(\\.)([a-zA-Z]{2,4})$")
    private String userName;

    @NotNull
    @Size(min = 2, message = "Passwords should have at least 2 characters and maxim 12", max = 12)
    private String password;

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
    public Player (String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
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



