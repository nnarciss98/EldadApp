package com.eldad.EldadApp.model.datamodel.dto;

import com.eldad.EldadApp.model.datamodel.EldadMediaType;

public class EldadMediaDto {
    private EldadMediaType eldadMediaType;
    private String ytTitle;
    private String ytId;
    private String ytUploadDate;
    private EldadRecommendationsDto recommendations;

    // Getters and Setters
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

    public String getYtUploadDate() {
        return ytUploadDate;
    }

    public void setYtUploadDate(String ytUploadDate) {
        this.ytUploadDate = ytUploadDate;
    }

    public EldadRecommendationsDto getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(EldadRecommendationsDto recommendations) {
        this.recommendations = recommendations;
    }

    public String getYtId() {
        return ytId;
    }

    public void setYtId(String ytId) {
        this.ytId = ytId;
    }
}
