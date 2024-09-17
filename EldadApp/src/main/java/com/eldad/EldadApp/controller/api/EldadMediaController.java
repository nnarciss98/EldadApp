package com.eldad.EldadApp.controller.api;

import com.eldad.EldadApp.controller.service.EldadMediaService;
import com.eldad.EldadApp.model.datamodel.EldadMedia;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/media")
public class EldadMediaController {

    @Autowired
    private EldadMediaService eldadMediaService;

    @GetMapping
    public List<EldadMedia> getAllMedia() {
        return eldadMediaService.getAllMedia();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EldadMedia> getMediaById(@PathVariable UUID id) {
        Optional<EldadMedia> media = eldadMediaService.getMediaById(id);
        return media.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<EldadMedia> createMedia(@RequestBody EldadMediaDto eldadMediaDto) {
        EldadMedia eldadMedia = eldadMediaService.convertToEntity(eldadMediaDto);
        EldadMedia savedMedia = eldadMediaService.saveMedia(eldadMedia);
        return ResponseEntity.ok(savedMedia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EldadMedia> updateMedia(
            @PathVariable UUID id,
            @RequestBody EldadMediaDto eldadMediaDto) {
        try {
            EldadMedia eldadMedia = eldadMediaService.convertToEntity(eldadMediaDto);
            EldadMedia updatedMedia = eldadMediaService.updateMedia(id, eldadMedia);
            return ResponseEntity.ok(updatedMedia);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable UUID id) {
        eldadMediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }
}
