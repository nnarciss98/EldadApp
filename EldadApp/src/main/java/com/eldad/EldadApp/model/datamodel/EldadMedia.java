package com.eldad.EldadApp.model.datamodel;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "eldadmedia", uniqueConstraints = @UniqueConstraint(columnNames = "ytUrl"))
public class EldadMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private EldadMediaType eldadMediaType;

    private String ytTitle;
    @Column(unique = true)
    private String ytUrl;
    private String ytUploadDate;

    @OneToOne(mappedBy = "recommendedBy", cascade = CascadeType.ALL)
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

    public String getYtUrl() {
        return ytUrl;
    }

    public void setYtUrl(String ytUrl) {
        this.ytUrl = ytUrl;
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
}
