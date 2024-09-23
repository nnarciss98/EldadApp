package com.eldad.EldadApp.model.datamodel;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "eldad_recommendations")
public class EldadRecommendations {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToMany
    @JoinColumn(name = "recommendation_id")
    private List<EldadMedia> recommendations;

    @OneToOne
    @JoinColumn(name = "recommended_by_id")
    @JsonBackReference
    private EldadMedia recommendedBy;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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
