package com.examly.springapp.service;

import com.examly.springapp.model.Hall;
import com.examly.springapp.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    public Hall addHall(Hall hall) {
        return hallRepository.save(hall);
    }

    public Optional<Hall> getHallById(Long id) {
        return hallRepository.findById(id);
    }

    public Hall updateHall(Long id, Hall updatedHall) {
        updatedHall.setId(id);
        return hallRepository.save(updatedHall);
    }

    public void deleteHall(Long id) {
        hallRepository.deleteById(id);
    }
}
