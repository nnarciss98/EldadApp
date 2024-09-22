package com.eldad.EldadApp.controller.api;

import com.eldad.EldadApp.controller.service.EldadMediaService;
import com.eldad.EldadApp.model.datamodel.EldadMedia;
import com.eldad.EldadApp.model.datamodel.EldadMediaMapper;
import com.eldad.EldadApp.model.datamodel.EldadRecommendations;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/media")
public class EldadMediaController {

    private final EldadMediaService eldadMediaService;
    private final EldadMediaMapper eldadMediaMapper;

    @Autowired
    public EldadMediaController(EldadMediaMapper eldadMediaMapper, EldadMediaService eldadMediaService) {
        this.eldadMediaMapper = eldadMediaMapper;
        this.eldadMediaService = eldadMediaService;
    }

    @GetMapping
    public List<EldadMedia> getAllMedia() {
        return eldadMediaService.getAllMedia();
    }

    @GetMapping("/{ytId}")
    public ResponseEntity<EldadMedia> getMediaByY(@PathVariable String ytId) {
        Optional<EldadMedia> media = eldadMediaService.getMediaByYtId(ytId);
        return media.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<EldadMedia> createMedia(@RequestBody EldadMediaDto eldadMediaDto) {

        EldadMedia eldadMedia = eldadMediaMapper.toEntity(eldadMediaDto);

        if (eldadMediaDto.getRecommendations() != null) {
            EldadRecommendations recommendations = new EldadRecommendations();
            recommendations.setRecommendations(eldadMediaDto.getRecommendations().getRecommendations());
            eldadMedia.setRecommendations(recommendations);
        }

        EldadMedia savedMedia = eldadMediaService.saveMedia(eldadMedia);
        return ResponseEntity.ok(savedMedia);
    }

    @PutMapping("/{ytId}")
    public ResponseEntity<EldadMedia> updateMedia(
            @PathVariable String ytId,
            @RequestBody EldadMediaDto eldadMediaDto) {
        try {
            EldadMedia eldadMedia = eldadMediaMapper.toEntity(eldadMediaDto);
            EldadMedia updatedMedia = eldadMediaService.updateMedia(ytId, eldadMedia);
            return ResponseEntity.ok(updatedMedia);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{ytId}")
    public ResponseEntity<Void> deleteMediaByYtId(@PathVariable String ytId) {
        eldadMediaService.deleteMediaByYtId(ytId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{ytVideoCode}/recommendations")
    public ResponseEntity<EldadMedia> addRecommendation(
            @PathVariable String ytVideoCode,
            @RequestBody String recommendationYtId) {
        try {
            EldadMedia updatedMedia = eldadMediaService.addRecommendation(ytVideoCode, recommendationYtId);
            return ResponseEntity.ok(updatedMedia);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
