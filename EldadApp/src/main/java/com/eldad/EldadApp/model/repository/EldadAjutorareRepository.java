package com.eldad.EldadApp.model.repository;

import com.eldad.EldadApp.model.datamodel.EldadAjutorare;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EldadAjutorareRepository extends JpaRepository<EldadAjutorare, UUID> {
}
