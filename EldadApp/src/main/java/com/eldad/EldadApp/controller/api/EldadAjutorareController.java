package com.eldad.EldadApp.controller.api;

import com.eldad.EldadApp.controller.service.EldadAjutorareService;
import com.eldad.EldadApp.model.datamodel.dto.EldadAjutorareDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ajutorare")
public class EldadAjutorareController {

    private final EldadAjutorareService eldadAjutorareService;

    @Autowired
    public EldadAjutorareController(EldadAjutorareService eldadAjutorareService){
        this.eldadAjutorareService = eldadAjutorareService;
    }

    @GetMapping
    public ResponseEntity<List<EldadAjutorareDto>> getAll(){
        return ResponseEntity.ok(eldadAjutorareService.getAllEldadAjutorare());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EldadAjutorareDto> getAjutorareById(@PathVariable UUID id){
        Optional<EldadAjutorareDto> ajutorare = eldadAjutorareService.getEldadAjutorareById(id);
        return ajutorare.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<EldadAjutorareDto> createAjutorare(@RequestBody EldadAjutorareDto eldadAjutorareDto){
        EldadAjutorareDto createdAjutorare = eldadAjutorareService.saveEldadAjutorare(eldadAjutorareDto);
        return ResponseEntity.ok(createdAjutorare);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EldadAjutorareDto> updateAjutorare(
            @PathVariable UUID id,
            @RequestBody EldadAjutorareDto ajutorareDto){
        try {
            EldadAjutorareDto updatedAjutorare = eldadAjutorareService.updateEldadAjutorare(id, ajutorareDto);
            return ResponseEntity.ok(updatedAjutorare);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEldadAjutorare(@PathVariable UUID id){
        eldadAjutorareService.deleteEldadAjutorareById(id);
        return ResponseEntity.noContent().build();
    }

}
