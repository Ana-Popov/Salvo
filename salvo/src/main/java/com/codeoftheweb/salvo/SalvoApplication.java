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
			Date date1 = game1.getDate();
			Date date2 = Date.from(date1.toInstant().plusSeconds(3600));
			game2.setDate(date2);
			Date date3 = Date.from(date2.toInstant().plusSeconds(3600));
			game3.setDate(date3);


			gameRepository.save(game1);
			gameRepository.save(game2);
			gameRepository.save(game3);

			GamePlayer gamePlayer1 = new GamePlayer(player1, game1);
			GamePlayer gamePlayer2 = new GamePlayer(player2, game2);
			GamePlayer gamePlayer3 = new GamePlayer(player3, game3);
			GamePlayer gamePlayer4 = new GamePlayer(player4, game3);

			gamePlayerRepository.save(gamePlayer1);
			gamePlayerRepository.save(gamePlayer2);
			gamePlayerRepository.save(gamePlayer3);
			gamePlayerRepository.save(gamePlayer4);

		};
	}
}
