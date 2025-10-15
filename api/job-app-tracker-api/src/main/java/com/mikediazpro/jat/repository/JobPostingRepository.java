package com.mikediazpro.jat.repository;

import com.mikediazpro.jat.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface JobPostingRepository extends JpaRepository<JobPosting, UUID> {

}