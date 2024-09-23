package com.eldad.EldadApp.model.datamodel.dto;

import com.eldad.EldadApp.model.datamodel.EldadMediaType;

import java.util.List;
import java.util.UUID;

public class EldadMediaDto {
    private UUID id;
    private EldadMediaType eldadMediaType;
    private String ytTitle;
    private String ytId;
    private String ytUploadDate;
    private List<String> recommendations; // Include recommendations as a nested DTO
    private EldadRecommendationsDto recommendationsDto; // Include recommendations as a nested DTO

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public EldadMediaType getEldadMediaType() {
        return eldadMediaType;
    }

    public void setEldadMediaType(EldadMediaType eldadMediaType) {
        this.eldadMediaType = eldadMediaType;
    }

    public String getYtTitle() {
        return ytTitle;
    }

    public void setYtTitle(String ytTitle) {
        this.ytTitle = ytTitle;
    }

    public String getYtId() {
        return ytId;
    }

    public void setYtId(String ytId) {
        this.ytId = ytId;
    }

    public String getYtUploadDate() {
        return ytUploadDate;
    }

    public void setYtUploadDate(String ytUploadDate) {
        this.ytUploadDate = ytUploadDate;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }

    public EldadRecommendationsDto getRecommendationsDto() {
        return recommendationsDto;
    }

    public void setRecommendationsDto(EldadRecommendationsDto recommendationsDto) {
        this.recommendationsDto = recommendationsDto;
    }
}
