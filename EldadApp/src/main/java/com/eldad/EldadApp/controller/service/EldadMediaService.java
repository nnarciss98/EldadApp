package com.eldad.EldadApp.controller.service;

import com.eldad.EldadApp.model.datamodel.EldadMedia;
import com.eldad.EldadApp.model.datamodel.dto.EldadMediaDto;
import com.eldad.EldadApp.model.repository.EldadMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EldadMediaService {

    @Autowired
    private EldadMediaRepository eldadMediaRepository;

    public List<EldadMedia> getAllMedia() {
        return eldadMediaRepository.findAll();
    }

    public Optional<EldadMedia> getMediaById(UUID id) {
        return eldadMediaRepository.findById(id);
    }

    @Transactional
    public EldadMedia saveMedia(EldadMedia eldadMedia) {
        return eldadMediaRepository.save(eldadMedia);
    }

    @Transactional
    public void deleteMedia(UUID id) {
        eldadMediaRepository.deleteById(id);
    }

    @Transactional
    public EldadMedia updateMedia(UUID id, EldadMedia newEldadMedia) {
        Optional<EldadMedia> optionalMedia = eldadMediaRepository.findById(id);
        if (optionalMedia.isPresent()) {
            EldadMedia existingMedia = optionalMedia.get();
            existingMedia.setEldadMediaType(newEldadMedia.getEldadMediaType());
            existingMedia.setYtTitle(newEldadMedia.getYtTitle());
            existingMedia.setYtUrl(newEldadMedia.getYtUrl());
            existingMedia.setYtUploadDate(newEldadMedia.getYtUploadDate());

            return eldadMediaRepository.save(existingMedia);
        } else {
            throw new RuntimeException("Media not found with id: " + id);
        }
    }

    public EldadMediaDto convertToDto(EldadMedia media) {
        EldadMediaDto dto = new EldadMediaDto();
        dto.setEldadMediaType(media.getEldadMediaType());
        dto.setYtTitle(media.getYtTitle());
        dto.setYtUrl(media.getYtUrl());
        dto.setYtUploadDate(media.getYtUploadDate());
        return dto;
    }

    public EldadMedia convertToEntity(EldadMediaDto dto) {
        EldadMedia media = new EldadMedia();
        media.setEldadMediaType(dto.getEldadMediaType());
        media.setYtTitle(dto.getYtTitle());
        media.setYtUrl(dto.getYtUrl());
        media.setYtUploadDate(dto.getYtUploadDate());
        return media;
    }


}
