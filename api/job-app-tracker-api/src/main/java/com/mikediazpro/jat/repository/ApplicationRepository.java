package com.mikediazpro.jat.repository;

import com.mikediazpro.jat.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
}