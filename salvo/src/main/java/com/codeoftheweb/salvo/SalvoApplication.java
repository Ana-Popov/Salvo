package com.codeoftheweb.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);

	}

	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository,
									  GameRepository gameRepository, GamePlayerRepository gamePlayerRepository) {
		return (args) -> {
			//save a few players
			Player player1 = new Player();
			player1.setUserName("j.bauer@ctu.go");
			Player player2 = new Player();
			player2.setUserName("c.obrien@ctu.gov");
			Player player3 = new Player();
			player3.setUserName("kim_bauer@gmail.com");
			Player player4 = new Player();
			player4.setUserName("t.almeida@ctu.gov");

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
			gamePlayer1.setPlayer(player2);

			GamePlayer gamePlayer2 = new GamePlayer(player1, game2);
			gamePlayer2.setPlayer(player2);

			GamePlayer gamePlayer3 = new GamePlayer(player2, game3);
			gamePlayer3.setPlayer(player3);

			GamePlayer gamePlayer4 = new GamePlayer(player2, game4);
			gamePlayer4.setPlayer(player1);

			GamePlayer gamePlayer5 = new GamePlayer(player4, game5);
			gamePlayer5.setPlayer(player1);

			GamePlayer gamePlayer6 = new GamePlayer(player3, game6);
			GamePlayer gamePlayer7 = new GamePlayer(player4, game7);

			GamePlayer gamePlayer8 = new GamePlayer(player3, game8);
			gamePlayer8.setPlayer(player4);


			gamePlayerRepository.save(gamePlayer1);
			gamePlayerRepository.save(gamePlayer2);
			gamePlayerRepository.save(gamePlayer3);
			gamePlayerRepository.save(gamePlayer4);
			gamePlayerRepository.save(gamePlayer5);
			gamePlayerRepository.save(gamePlayer6);
			gamePlayerRepository.save(gamePlayer7);
			gamePlayerRepository.save(gamePlayer8);

		};
	}
}
