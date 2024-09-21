package com.eldad.EldadApp.controller.service;

import com.eldad.EldadApp.model.datamodel.EldadMedia;
import com.eldad.EldadApp.model.datamodel.EldadRecommendations;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import com.eldad.EldadApp.model.repository.EldadMediaRepository;
import com.eldad.EldadApp.model.repository.EldadRecommendationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EldadMediaService {

    @Autowired
    private EldadMediaRepository eldadMediaRepository;
    @Autowired
    private EldadRecommendationsRepository eldadRecommendationsRepository;

    public List<EldadMedia> getAllMedia() {
        return eldadMediaRepository.findAll();
    }

    public Optional<EldadMedia> getMediaById(UUID id) {
        return eldadMediaRepository.findById(id);
    }

    public Optional<EldadMedia> getMediaByYtId(String ytId){
        return eldadMediaRepository.findByYtId(ytId);
    }

    @Transactional
    public EldadMedia saveMedia(EldadMedia eldadMedia) {
        EldadMedia savedMedia = eldadMediaRepository.save(eldadMedia);

        if (eldadMedia.getRecommendations() != null) {
            EldadRecommendations recommendations = eldadMedia.getRecommendations();
            recommendations.setRecommendedBy(savedMedia);
            eldadRecommendationsRepository.save(recommendations);
        }
        return savedMedia;
    }

    @Transactional
    public void deleteMedia(UUID id) {
        eldadRecommendationsRepository.findByRecommendedById(id).ifPresent(eldadRecommendationsRepository::delete);
        eldadMediaRepository.deleteById(id);
    }

    @Transactional
    public void deleteMediaByYtUrl(String ytUrl) {
        eldadMediaRepository.deleteByYtUrl(ytUrl);
    }

    @Transactional
    public EldadMedia updateMedia(String ytId, EldadMedia newEldadMedia) {
        Optional<EldadMedia> optionalMedia = eldadMediaRepository.findByYtId(ytId);
        if (optionalMedia.isPresent()) {
            EldadMedia existingMedia = optionalMedia.get();
            existingMedia.setEldadMediaType(newEldadMedia.getEldadMediaType());
            existingMedia.setYtTitle(newEldadMedia.getYtTitle());
            existingMedia.setYtId(newEldadMedia.getYtId());
            existingMedia.setYtUploadDate(newEldadMedia.getYtUploadDate());

            // Handle recommendations if they exist
            if (newEldadMedia.getRecommendations() != null) {
                EldadRecommendations newRecommendations = newEldadMedia.getRecommendations();
                newRecommendations.setRecommendedBy(existingMedia);
                eldadRecommendationsRepository.save(newRecommendations);
                existingMedia.setRecommendations(newRecommendations);
            }

            return eldadMediaRepository.save(existingMedia);
        } else {
            throw new RuntimeException("Media not found with id: " + ytId);
        }
    }

    @Transactional
    public EldadMedia addRecommendation(String ytId, String recommendationYtId) {
        // Get the original media by ytUrl
        Optional<EldadMedia> optionalMedia = eldadMediaRepository.findByYtId(ytId);
        if (optionalMedia.isEmpty()) {
            throw new RuntimeException("Original media not found with ytVideoCode: " + ytId);
        }

        EldadMedia originalMedia = optionalMedia.get();

        // Check if the recommended media with the provided ytUrl exists
        Optional<EldadMedia> recommendedMediaOptional = eldadMediaRepository.findByYtId(recommendationYtId);
        if (recommendedMediaOptional.isEmpty()) {
            throw new RuntimeException("Recommended media not found with recommendationYtId: " + recommendationYtId);
        }

        EldadMedia recommendedMedia = recommendedMediaOptional.get();

        // Get or create the recommendations object
        EldadRecommendations recommendations = originalMedia.getRecommendations();
        if (recommendations == null) {
            recommendations = new EldadRecommendations();
            recommendations.setRecommendedBy(originalMedia);
        }

        // Add the recommended media to the list
        recommendations.getRecommendations().add(recommendedMedia);
        originalMedia.setRecommendations(recommendations);

        // Save and return the updated media
        return eldadMediaRepository.save(originalMedia);
    }

    public EldadMediaDto convertToDto(EldadMedia media) {
        EldadMediaDto dto = new EldadMediaDto();
        dto.setEldadMediaType(media.getEldadMediaType());
        dto.setYtTitle(media.getYtTitle());
        dto.setYtId(media.getYtId());
        dto.setYtUploadDate(media.getYtUploadDate());
        return dto;
    }

    public EldadMedia convertToEntity(EldadMediaDto dto) {
        EldadMedia media = new EldadMedia();
        media.setEldadMediaType(dto.getEldadMediaType());
        media.setYtTitle(dto.getYtTitle());
        media.setYtId(dto.getYtId());
        media.setYtUploadDate(dto.getYtUploadDate());
        return media;
    }


}
