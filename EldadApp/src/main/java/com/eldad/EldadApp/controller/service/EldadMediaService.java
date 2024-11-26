package com.eldad.EldadApp.controller.service;

import com.eldad.EldadApp.model.datamodel.EldadMedia;
import com.eldad.EldadApp.model.datamodel.EldadMapper;
import com.eldad.EldadApp.model.datamodel.EldadMediaType;
import com.eldad.EldadApp.model.datamodel.EldadRecommendations;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import com.eldad.EldadApp.model.repository.EldadMediaRepository;
import com.eldad.EldadApp.model.repository.EldadRecommendationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EldadMediaService {

    private final EldadMediaRepository eldadMediaRepository;
    private final EldadRecommendationsRepository eldadRecommendationsRepository;
    private final EldadMapper eldadMapper;

    @Autowired
    public EldadMediaService(EldadMediaRepository eldadMediaRepository, EldadRecommendationsRepository eldadRecommendationsRepository, EldadMapper eldadMapper) {
        this.eldadMediaRepository = eldadMediaRepository;
        this.eldadRecommendationsRepository = eldadRecommendationsRepository;
        this.eldadMapper = eldadMapper;
    }

    public List<EldadMediaDto> getAllMedia() {
        return eldadMediaRepository.findAll().stream()
                .map(eldadMapper::eldadMediaToDto)
                .collect(Collectors.toList());
    }

    public List<EldadMediaDto> getAllMediaType(EldadMediaType eldadMediaType) {
        return eldadMediaRepository.findByEldadMediaType(eldadMediaType).stream()
                .map(eldadMapper::eldadMediaToDto)
                .collect(Collectors.toList());
    }

    public Optional<EldadMediaDto> getMediaByYtId(String ytId) {
        return eldadMediaRepository.findByYtId(ytId).map(eldadMapper::eldadMediaToDto);
    }

    @Transactional
    public EldadMediaDto saveMedia(EldadMediaDto eldadMediaDto) {
        EldadMedia eldadMedia = eldadMapper.eldadMediaToEntity(eldadMediaDto);
        EldadMedia savedMedia = eldadMediaRepository.save(eldadMedia);
        return eldadMapper.eldadMediaToDto(savedMedia);
    }

    @Transactional
    public EldadMediaDto updateMedia(String ytId, EldadMediaDto newEldadMediaDto) {
        Optional<EldadMedia> optionalMedia = eldadMediaRepository.findByYtId(ytId);
        if (optionalMedia.isPresent()) {
            EldadMedia existingMedia = optionalMedia.get();
            existingMedia.setEldadMediaType(newEldadMediaDto.getEldadMediaType());
            existingMedia.setYtTitle(newEldadMediaDto.getYtTitle());
            existingMedia.setYtId(newEldadMediaDto.getYtId());
            existingMedia.setYtUploadDate(newEldadMediaDto.getYtUploadDate());

            if (newEldadMediaDto.getRecommendations() != null) {
                EldadRecommendations newRecommendations = eldadMapper.toRecommendationsEntity(newEldadMediaDto.getRecommendations());
                newRecommendations.setRecommendedBy(existingMedia);
                eldadRecommendationsRepository.save(newRecommendations);
                existingMedia.setRecommendations(newRecommendations);
            }

            return eldadMapper.eldadMediaToDto(eldadMediaRepository.save(existingMedia));
        } else {
            throw new RuntimeException("Media not found with id: " + ytId);
        }
    }

    @Transactional
    public EldadMediaDto addRecommendation(String ytId, String recommendationYtId) {
        Optional<EldadMedia> originalMediaOpt = eldadMediaRepository.findByYtId(ytId);
        if (originalMediaOpt.isEmpty()) {
            throw new RuntimeException("Original media not found with ytId: " + ytId);
        }

        EldadMedia originalMedia = originalMediaOpt.get();

        Optional<EldadMedia> recommendedMediaOpt = eldadMediaRepository.findByYtId(recommendationYtId);
        if (recommendedMediaOpt.isEmpty()) {
            throw new RuntimeException("Recommended media not found with ytId: " + recommendationYtId);
        }

        EldadMedia recommendedMedia = recommendedMediaOpt.get();
        EldadRecommendations recommendations = originalMedia.getRecommendations() == null
                ? new EldadRecommendations() : originalMedia.getRecommendations();

        recommendations.getRecommendations().add(recommendedMedia);
        originalMedia.setRecommendations(recommendations);
        eldadRecommendationsRepository.save(recommendations);

        return eldadMapper.eldadMediaToDto(eldadMediaRepository.save(originalMedia));
    }

    @Transactional
    public void deleteMediaByYtId(String ytId) {
        eldadMediaRepository.deleteByYtId(ytId);
    }
}