package com.examly.springapp.controller;

import com.examly.springapp.model.Hall;
import com.examly.springapp.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallService hallService;

    @GetMapping
    public List<Hall> getAllHalls() {
        return hallService.getAllHalls();
    }

    @PostMapping
    public Hall addHall(@RequestBody Hall hall) {
        return hallService.addHall(hall);
    }

    @PutMapping("/{id}")
    public Hall updateHall(@PathVariable Long id, @RequestBody Hall hall) {
        return hallService.updateHall(id, hall);
    }

    @DeleteMapping("/{id}")
    public void deleteHall(@PathVariable Long id) {
        hallService.deleteHall(id);
    }
}
