package com.eldad.EldadApp.model.datamodel;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "eldadmedia", uniqueConstraints = @UniqueConstraint(columnNames = "ytId"))
public class EldadMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private EldadMediaType eldadMediaType;

    private String ytTitle;
    @Column(unique = true)
    private String ytId;
    private String ytUploadDate;

    @OneToOne(mappedBy = "recommendedBy", cascade = CascadeType.ALL)
    @JsonManagedReference
    private EldadRecommendations recommendations;

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

    public String getYtUploadDate() {
        return ytUploadDate;
    }

    public void setYtUploadDate(String ytUploadDate) {
        this.ytUploadDate = ytUploadDate;
    }

    public EldadRecommendations getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(EldadRecommendations recommendations) {
        this.recommendations = recommendations;
    }

    public String getYtId() {
        return ytId;
    }

    public void setYtId(String ytId) {
        this.ytId = ytId;
    }
}
