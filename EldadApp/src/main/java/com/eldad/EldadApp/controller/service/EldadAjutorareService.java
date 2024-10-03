package com.eldad.EldadApp.controller.service;

import com.eldad.EldadApp.model.datamodel.EldadAjutorare;
import com.eldad.EldadApp.model.datamodel.EldadMapper;
import com.eldad.EldadApp.model.datamodel.dto.EldadAjutorareDto;
import com.eldad.EldadApp.model.repository.EldadAjutorareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EldadAjutorareService {

    private final EldadAjutorareRepository eldadAjutorareRepository;
    private final EldadMapper eldadMapper;

    @Autowired
    public EldadAjutorareService(EldadAjutorareRepository eldadAjutorareRepository, EldadMapper eldadMapper){
        this.eldadAjutorareRepository = eldadAjutorareRepository;
        this.eldadMapper = eldadMapper;
    }

    @Transactional
    public EldadAjutorareDto saveEldadAjutorare(EldadAjutorareDto eldadAjutorareDto) {
        EldadAjutorare ajutorare = eldadMapper.eldadAjutorareToEntity(eldadAjutorareDto);
        EldadAjutorare savedAjutorare = eldadAjutorareRepository.save(ajutorare);
        return eldadMapper.eldadAjutorareToDto(savedAjutorare);
    }

    public List<EldadAjutorareDto> getAllEldadAjutorare() {
        return eldadAjutorareRepository.findAll().stream()
                .map(eldadMapper::eldadAjutorareToDto)
                .collect(Collectors.toList());
    }

    public Optional<EldadAjutorareDto> getEldadAjutorareById(UUID id) {
        return eldadAjutorareRepository.findById(id).map(eldadMapper::eldadAjutorareToDto);
    }

    @Transactional
    public EldadAjutorareDto updateEldadAjutorare(UUID id, EldadAjutorareDto newEldadAjutorare){
        Optional<EldadAjutorare> optionalAjutorare = eldadAjutorareRepository.findById(id);
        if(optionalAjutorare.isPresent()){
          EldadAjutorare existingAjutorare = optionalAjutorare.get();
          existingAjutorare.setTitle(newEldadAjutorare.getTitle());
          existingAjutorare.setContent(newEldadAjutorare.getContent());

          return eldadMapper.eldadAjutorareToDto(eldadAjutorareRepository.save(existingAjutorare));
        } else {
            throw new RuntimeException("Eldad Ajutorare not found with id: " + id);
        }
    }

    @Transactional
    public void deleteEldadAjutorareById(UUID id){
        eldadAjutorareRepository.deleteById(id);
    }
}
