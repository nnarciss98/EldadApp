package com.eldad.EldadApp.controller.api;

import com.eldad.EldadApp.controller.service.EldadMediaService;
import com.eldad.EldadApp.model.datamodel.EldadMediaType;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import com.eldad.EldadApp.model.datamodel.dto.TestResponse;
import io.jsonwebtoken.lang.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/media")
public class EldadMediaController {

    private final EldadMediaService eldadMediaService;

    private static final Logger LOG = LoggerFactory.getLogger(EldadMediaController.class);

    @Autowired
    public EldadMediaController(EldadMediaService eldadMediaService) {
        this.eldadMediaService = eldadMediaService;
    }

    @GetMapping("/test")
    public ResponseEntity<TestResponse> test(){
        TestResponse test = new TestResponse();
        test.setText("Test json work good");
        LOG.info("Test requested");
        return ResponseEntity.ok(test);
    }

    @GetMapping
    public List<EldadMediaDto> getAllMedia() {
        LOG.info("Get all media");
        return eldadMediaService.getAllMedia();
    }

    @GetMapping("/findAll/{type}")
    public ResponseEntity<List<EldadMediaDto>> getAllMediaType(@PathVariable String type) {
        try {
            LOG.info("Get all media of type {}", type);
            EldadMediaType eldadMediaType = EldadMediaType.valueOf(type.toUpperCase());
            List<EldadMediaDto> mediaList = eldadMediaService.getAllMediaType(eldadMediaType);
            return ResponseEntity.ok(mediaList);
        } catch (IllegalArgumentException e) {
            LOG.error("Invalid media type provided: {}", type);
            return ResponseEntity.badRequest().body(Collections.emptyList());
        } catch (Exception e) {
            LOG.error("Unexpected error occurred while fetching media of type {}: {}", type, e.getMessage(), e);
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    @GetMapping("/{ytId}")
    public ResponseEntity<EldadMediaDto> getMediaByYtId(@PathVariable String ytId) {
        Optional<EldadMediaDto> media = eldadMediaService.getMediaByYtId(ytId);
        return media.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<EldadMediaDto> createMedia(@RequestBody EldadMediaDto eldadMediaDto) {
        EldadMediaDto savedMedia = eldadMediaService.saveMedia(eldadMediaDto);
        return ResponseEntity.ok(savedMedia);
    }

    @PutMapping("/{ytId}")
    public ResponseEntity<EldadMediaDto> updateMedia(
            @PathVariable String ytId,
            @RequestBody EldadMediaDto eldadMediaDto) {
        try {
            EldadMediaDto updatedMedia = eldadMediaService.updateMedia(ytId, eldadMediaDto);
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
    public ResponseEntity<EldadMediaDto> addRecommendation(
            @PathVariable String ytVideoCode,
            @RequestBody String recommendationYtId) {
        try {
            EldadMediaDto updatedMedia = eldadMediaService.addRecommendation(ytVideoCode, recommendationYtId);
            return ResponseEntity.ok(updatedMedia);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
