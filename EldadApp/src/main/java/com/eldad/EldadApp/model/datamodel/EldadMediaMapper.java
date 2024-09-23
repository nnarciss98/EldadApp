package com.eldad.EldadApp.model.datamodel;

import com.eldad.EldadApp.controller.service.EldadMediaService;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import com.eldad.EldadApp.model.datamodel.dto.EldadRecommendationsDto;
import com.eldad.EldadApp.model.repository.EldadMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class EldadMediaMapper {

    private final EldadMediaRepository eldadMediaRepository;

    @Autowired
    public EldadMediaMapper(EldadMediaRepository eldadMediaRepository) {
        this.eldadMediaRepository = eldadMediaRepository;
    }

    public EldadMedia toEntity(EldadMediaDto dto) {
        EldadMedia media = new EldadMedia();
        media.setEldadMediaType(dto.getEldadMediaType());
        media.setYtTitle(dto.getYtTitle());
        media.setYtId(dto.getYtId());
        media.setYtUploadDate(dto.getYtUploadDate());

        if (dto.getRecommendations() != null) {
            EldadRecommendations recommendations = new EldadRecommendations();
            List<EldadMedia> recommendedMediaList = dto.getRecommendations().stream()
                    .map(ytId -> eldadMediaRepository.findByYtId(ytId)
                            .orElseThrow(() -> new RuntimeException("Media not found with ytId: " + ytId)))
                    .collect(Collectors.toList());
            recommendations.setRecommendations(recommendedMediaList);
            recommendations.setRecommendedBy(media);
            media.setRecommendations(recommendations);
        }
        return media;
    }

    public EldadMediaDto toDto(EldadMedia media) {
        EldadMediaDto dto = new EldadMediaDto();
        dto.setId(media.getId());
        dto.setEldadMediaType(media.getEldadMediaType());
        dto.setYtTitle(media.getYtTitle());
        dto.setYtId(media.getYtId());
        dto.setYtUploadDate(media.getYtUploadDate());
        if (media.getRecommendations() != null) {
            dto.setRecommendationsDto(this.toRecommendationsDto(media.getRecommendations()));
            List<String> recommendedYtIds = media.getRecommendations().getRecommendations().stream()
                    .map(EldadMedia::getYtId)
                    .collect(Collectors.toList());
            dto.setRecommendations(recommendedYtIds);
        }
        return dto;
    }

    public EldadRecommendations toRecommendationsEntity(List<String> recommendationsRequest) {

        EldadRecommendations recommendations = new EldadRecommendations();
        List<EldadMedia> recommendedMediaList = recommendationsRequest.stream()
                .map(ytId -> eldadMediaRepository.findByYtId(ytId)
                        .orElseThrow(() -> new RuntimeException("Media not found with ytId: " + ytId)))
                .toList();
        recommendations.setRecommendations(recommendedMediaList);

        return recommendations;
    }

    public EldadRecommendationsDto toRecommendationsDto(EldadRecommendations recommendations) {
        EldadRecommendationsDto dto = new EldadRecommendationsDto();
        dto.setId(recommendations.getId());
        if (recommendations.getRecommendedBy() != null) {
            dto.setRecommendedById(recommendations.getRecommendedBy().getId());
        }

        if (recommendations.getRecommendations() != null) {
            dto.setRecommendations(recommendations.getRecommendations().stream()
                    .map(this::toDto)
                    .collect(Collectors.toList())
            );
        }
        return dto;
    }
}
