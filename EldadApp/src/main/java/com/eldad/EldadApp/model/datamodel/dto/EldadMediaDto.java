package com.eldad.EldadApp.model.datamodel.dto;

import com.eldad.EldadApp.model.datamodel.EldadMediaType;

import java.util.List;

public class EldadMediaDto {
    private EldadMediaType eldadMediaType;
    private String ytTitle;
    private String ytUrl;
    private String ytUploadDate;

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
}
