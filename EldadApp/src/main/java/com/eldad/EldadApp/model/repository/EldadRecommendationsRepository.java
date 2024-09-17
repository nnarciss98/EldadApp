package com.eldad.EldadApp.model.repository;

import com.eldad.EldadApp.model.datamodel.EldadRecommendations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EldadRecommendationsRepository extends JpaRepository<EldadRecommendations, UUID> {
    Optional<EldadRecommendations> findByRecommendedById(UUID id);
}
