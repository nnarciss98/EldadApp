package com.eldad.EldadApp.model.datamodel;

import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import org.springframework.stereotype.Component;

@Component
public class EldadMediaMapper {
    public EldadMedia toEntity(EldadMediaDto dto) {
        EldadMedia media = new EldadMedia();
        media.setEldadMediaType(dto.getEldadMediaType());
        media.setYtTitle(dto.getYtTitle());
        media.setYtId(dto.getYtId());
        media.setYtUploadDate(dto.getYtUploadDate());
        return media;
    }

    public EldadMediaDto toDto(EldadMedia media) {
        EldadMediaDto dto = new EldadMediaDto();
        dto.setEldadMediaType(media.getEldadMediaType());
        dto.setYtTitle(media.getYtTitle());
        dto.setYtId(media.getYtId());
        dto.setYtUploadDate(media.getYtUploadDate());
        return dto;
    }
}
