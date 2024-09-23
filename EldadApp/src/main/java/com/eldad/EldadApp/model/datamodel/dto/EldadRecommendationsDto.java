package com.eldad.EldadApp.model.datamodel.dto;

import java.util.List;
import java.util.UUID;

public class EldadRecommendationsDto {
    private UUID id;
    private UUID recommendedById;
    private List<EldadMediaDto> recommendations;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getRecommendedById() {
        return recommendedById;
    }

    public void setRecommendedById(UUID recommendedById) {
        this.recommendedById = recommendedById;
    }

    public List<EldadMediaDto> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<EldadMediaDto> recommendations) {
        this.recommendations = recommendations;
    }
}
