package salvo.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);

	}

	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository,
									  GameRepository gameRepository,
									  GamePlayerRepository gamePlayerRepository,
                                      ShipRepository shipRepository,
									  SalvoRepository salvoRepository,
									  ScoreRepository scoreRepository) {
		return (args) -> {
			//save a few players
			Player player1 = new Player("j.bauer@ctu.go");
			Player player2 = new Player("c.obrien@ctu.gov");
//			player2.setUserName("c.obrien@ctu.gov");
			Player player3 = new Player("kim_bauer@gmail.com");
			Player player4 = new Player("t.almeida@ctu.gov");


			playerRepository.save(player1);
			playerRepository.save(player2);
			playerRepository.save(player3);
			playerRepository.save(player4);


			Game game1 = new Game();
			Game game2 = new Game();
			Game game3 = new Game();
			Game game4 = new Game();
			Game game5 = new Game();
			Game game6 = new Game();
			Game game7 = new Game();
			Game game8 = new Game();

			Date date1 = game1.getDate();
			Date date2 = Date.from(date1.toInstant().plusSeconds(3600));
			game2.setDate(date2);
			Date date3 = Date.from(date2.toInstant().plusSeconds(3600));
			game3.setDate(date3);
			Date date4 = Date.from(date3.toInstant().plusSeconds(3600));
			game4.setDate(date4);
			Date date5= Date.from(date4.toInstant().plusSeconds(3600));
			game5.setDate(date5);
			Date date6= Date.from(date5.toInstant().plusSeconds(3600));
			game6.setDate(date6);
			Date date7= Date.from(date6.toInstant().plusSeconds(3600));
			game7.setDate(date7);
			Date date8= Date.from(date7.toInstant().plusSeconds(3600));
			game8.setDate(date8);

			gameRepository.save(game1);
			gameRepository.save(game2);
			gameRepository.save(game3);
			gameRepository.save(game4);
			gameRepository.save(game5);
			gameRepository.save(game6);
			gameRepository.save(game7);
			gameRepository.save(game8);

			GamePlayer gamePlayer1 = new GamePlayer(player1, game1);
			GamePlayer gamePlayer2 = new GamePlayer(player1, game2);
				GamePlayer gamePlayer3 = new GamePlayer(player3, game1);
			GamePlayer gamePlayer4 = new GamePlayer(player3, game2);
			GamePlayer gamePlayer5 = new GamePlayer(player4, game3);
			GamePlayer gamePlayer6 = new GamePlayer(player3, game4);
			GamePlayer gamePlayer7 = new GamePlayer(player1, game3);
			GamePlayer gamePlayer8 = new GamePlayer(player2, game5);
			GamePlayer gamePlayer9 = new GamePlayer(player1, game5);
			GamePlayer gamePlayer10 = new GamePlayer(player3, game6);
			GamePlayer gamePlayer11 = new GamePlayer(player4, game6);
			GamePlayer gamePlayer12 = new GamePlayer(player4, game7);
			GamePlayer gamePlayer13 = new GamePlayer(player1, game8);


			gamePlayerRepository.save(gamePlayer1);
			gamePlayerRepository.save(gamePlayer2);
			gamePlayerRepository.save(gamePlayer3);
			gamePlayerRepository.save(gamePlayer4);
			gamePlayerRepository.save(gamePlayer5);
			gamePlayerRepository.save(gamePlayer6);
			gamePlayerRepository.save(gamePlayer7);
			gamePlayerRepository.save(gamePlayer8);
			gamePlayerRepository.save(gamePlayer9);
			gamePlayerRepository.save(gamePlayer10);
			gamePlayerRepository.save(gamePlayer11);
			gamePlayerRepository.save(gamePlayer12);
			gamePlayerRepository.save(gamePlayer13);

//
            List<String> ship1Location = Arrays.asList("H2", "H3", "H4");
            List<String> ship2Location = Arrays.asList("E1", "F1", "G1");
            List<String> ship3Location = Arrays.asList("B4", "B5");
            List<String> ship4Location = Arrays.asList("B5", "C5", "D5");
            List<String> ship5Location = Arrays.asList("F1", "F2");
            List<String> ship6Location = Arrays.asList("B5", "C5", "D5");
            List<String> ship7Location = Arrays.asList("C6", "C7");
            List<String> ship8Location = Arrays.asList("A2", "A3", "A4");
            List<String> ship9Location = Arrays.asList("G6", "H6");
            List<String> ship10Location = Arrays.asList("B5", "C5", "D5");
            List<String> ship11Location = Arrays.asList("C6", "C7");
            List<String> ship12Location = Arrays.asList("A2", "A3", "A4");
            List<String> ship13Location = Arrays.asList("G6", "H6");
            List<String> ship14Location = Arrays.asList("B5", "C5", "D5");
            List<String> ship15Location = Arrays.asList("C6", "C7");

            Ship ship1 = new Ship("Destroyer",ship1Location, gamePlayer1);
            Ship ship2 = new Ship("Submarine", ship2Location, gamePlayer1);
            Ship ship3 = new Ship("Patrol Boat", ship3Location, gamePlayer3);
            Ship ship4 = new Ship("Destroyer", ship4Location, gamePlayer3);
            Ship ship5 = new Ship("Patrol Boat", ship5Location, gamePlayer1);
            Ship ship6 = new Ship("Destroyer", ship6Location, gamePlayer1);
            Ship ship7 = new Ship("Submarine", ship7Location, gamePlayer3);
            Ship ship8 = new Ship("Patrol Boat", ship8Location, gamePlayer3);
            Ship ship9 = new Ship("Destroyer", ship9Location, gamePlayer6);
            Ship ship10 = new Ship("Submarine", ship10Location, gamePlayer12);
            Ship ship11 = new Ship("Patrol Boat", ship11Location, gamePlayer7);
            Ship ship12 = new Ship("Destroyer", ship12Location, gamePlayer8);
            Ship ship13 = new Ship("Destroyer", ship13Location, gamePlayer9);
            Ship ship14 = new Ship("Submarine", ship14Location, gamePlayer10);
            Ship ship15 = new Ship("Destroyer", ship15Location, gamePlayer11);

            shipRepository.save(ship1);
            shipRepository.save(ship2);
            shipRepository.save(ship3);
            shipRepository.save(ship4);
            shipRepository.save(ship5);
            shipRepository.save(ship6);
            shipRepository.save(ship7);
            shipRepository.save(ship8);
            shipRepository.save(ship9);
            shipRepository.save(ship10);
            shipRepository.save(ship11);
            shipRepository.save(ship12);
            shipRepository.save(ship13);
            shipRepository.save(ship14);
            shipRepository.save(ship15);

            List<String> salvoLocation1 = Arrays.asList("B5", "C5", "F1");
            List<String> salvoLocation2 = Arrays.asList("F2", "D5", "F1");
            List<String> salvoLocation3 = Arrays.asList("A2", "A4", "G6");
            List<String> salvoLocation4 = Arrays.asList("A3", "H6");
            List<String> salvoLocation5 = Arrays.asList("G6", "H6", "A4");
            List<String> salvoLocation6 = Arrays.asList("G2", "A3", "D8");
            List<String> salvoLocation7 = Arrays.asList("A3", "A4", "F7");

            Salvo salvo1 = new Salvo(1, salvoLocation1, gamePlayer1);
            Salvo salvo2 = new Salvo (2, salvoLocation2, gamePlayer1);
            Salvo salvo3 = new Salvo(1, salvoLocation3, gamePlayer2);
            Salvo salvo4 = new Salvo (2, salvoLocation4, gamePlayer2);
            Salvo salvo5 = new Salvo (1, salvoLocation5, gamePlayer3);
            Salvo salvo6 = new Salvo (2, salvoLocation6, gamePlayer3);
            Salvo salvo7 = new Salvo (1, salvoLocation7, gamePlayer4);
            Salvo salvo8 = new Salvo (1, salvoLocation1, gamePlayer4);
            Salvo salvo9 = new Salvo (2, salvoLocation5, gamePlayer5);

            salvoRepository.save(salvo1);
            salvoRepository.save(salvo2);
            salvoRepository.save(salvo3);
            salvoRepository.save(salvo4);
            salvoRepository.save(salvo5);
            salvoRepository.save(salvo6);
            salvoRepository.save(salvo7);
            salvoRepository.save(salvo8);
            salvoRepository.save(salvo9);

            Date finishDate1 = new Date();

            Score score1 = new Score(game1,player1, 1.0,finishDate1);
            Score score2 = new Score(game1,player3, 0.0,finishDate1);
            Score score3 = new Score(game2,player1, 0.5,finishDate1);
            Score score4 = new Score(game2,player3, 0.5,finishDate1);
            Score score5 = new Score(game3,player4, 0.0,finishDate1);
            Score score6 = new Score(game3,player1, 1.0,finishDate1);

            scoreRepository.save(score1);
            scoreRepository.save(score2);
            scoreRepository.save(score3);
            scoreRepository.save(score4);
			scoreRepository.save(score5);
            scoreRepository.save(score6);


        };
	}
}
