package com.eldad.EldadApp.model.datamodel.dto;

import com.eldad.EldadApp.model.datamodel.EldadMedia;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import java.util.List;

public class EldadRecommendationsDto {
    private EldadMedia recommendedBy;

    private List<EldadMedia> recommendations;

    public EldadMedia getRecommendedBy() {
        return recommendedBy;
    }

    public void setRecommendedBy(EldadMedia recommendedBy) {
        this.recommendedBy = recommendedBy;
    }

    public List<EldadMedia> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<EldadMedia> recommendations) {
        this.recommendations = recommendations;
    }
}
