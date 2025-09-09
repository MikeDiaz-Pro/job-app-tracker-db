package com.mikediazpro.jat.repository;

import com.mikediazpro.jat.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, String> {
}