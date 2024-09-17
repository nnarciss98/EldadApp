package com.eldad.EldadApp.controller.api;

import com.eldad.EldadApp.controller.service.EldadMediaService;
import com.eldad.EldadApp.model.datamodel.EldadMedia;
import com.eldad.EldadApp.model.datamodel.EldadRecommendations;
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

    @GetMapping("/{ytUrl}")
    public ResponseEntity<EldadMedia> getMediaByYtUrl(@PathVariable String ytUrl) {
        Optional<EldadMedia> media = eldadMediaService.getMediaByYtUrl(ytUrl);
        return media.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<EldadMedia> createMedia(@RequestBody EldadMediaDto eldadMediaDto) {

        EldadMedia eldadMedia = convertToEntity(eldadMediaDto);

        if (eldadMediaDto.getRecommendations() != null) {
            EldadRecommendations recommendations = new EldadRecommendations();
            recommendations.setRecommendations(eldadMediaDto.getRecommendations().getRecommendations());
            eldadMedia.setRecommendations(recommendations);
        }

        EldadMedia savedMedia = eldadMediaService.saveMedia(eldadMedia);
        return ResponseEntity.ok(savedMedia);
    }

    @PutMapping("/{ytUrl}")
    public ResponseEntity<EldadMedia> updateMedia(
            @PathVariable String ytUrl,
            @RequestBody EldadMediaDto eldadMediaDto) {
        try {
            EldadMedia eldadMedia = eldadMediaService.convertToEntity(eldadMediaDto);
            EldadMedia updatedMedia = eldadMediaService.updateMedia(ytUrl, eldadMedia);
            return ResponseEntity.ok(updatedMedia);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{ytUrl}")
    public ResponseEntity<Void> deleteMediaByYtUrl(@PathVariable String ytUrl) {
        eldadMediaService.deleteMediaByYtUrl(ytUrl);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{mediaYtUrl}/recommendations")
    public ResponseEntity<EldadMedia> addRecommendation(
            @PathVariable String mediaYtUrl,
            @RequestBody String recommendationYtUrl) {
        try {
            EldadMedia updatedMedia = eldadMediaService.addRecommendation(mediaYtUrl, recommendationYtUrl);
            return ResponseEntity.ok(updatedMedia);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    public EldadMedia convertToEntity(EldadMediaDto dto) {
        EldadMedia media = new EldadMedia();
        media.setEldadMediaType(dto.getEldadMediaType());
        media.setYtTitle(dto.getYtTitle());
        media.setYtUrl(dto.getYtUrl());
        media.setYtUploadDate(dto.getYtUploadDate());
        return media;
    }

    public EldadMediaDto convertToDto(EldadMedia media) {
        EldadMediaDto dto = new EldadMediaDto();
        dto.setEldadMediaType(media.getEldadMediaType());
        dto.setYtTitle(media.getYtTitle());
        dto.setYtUrl(media.getYtUrl());
        dto.setYtUploadDate(media.getYtUploadDate());
        return dto;
    }

}
