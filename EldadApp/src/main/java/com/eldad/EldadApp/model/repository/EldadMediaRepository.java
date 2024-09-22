package com.eldad.EldadApp.model.repository;

import com.eldad.EldadApp.model.datamodel.EldadMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EldadMediaRepository extends JpaRepository<EldadMedia, UUID> {
    Optional<EldadMedia> findByYtId(String ytId);
    void deleteByYtId(String ytId);
}
