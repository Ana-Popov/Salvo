package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")
public class SalvoController {
    @Autowired
    private GameRepository repo;

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
    //this method returns the id and the creation date for one game - the method is used above.
    public Map<String,Object> makeGameDTO(Game game) {
        Map<String,Object> dto = new HashMap<String, Object>();
        dto.put("id",game.getId());
        dto.put("created", game.getDate());
        return dto;
    }

}
