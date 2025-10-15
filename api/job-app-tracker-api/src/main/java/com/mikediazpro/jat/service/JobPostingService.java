package com.mikediazpro.jat.service;

import com.mikediazpro.jat.entity.JobPosting;
import com.mikediazpro.jat.model.dto.JobPostingDto;
import com.mikediazpro.jat.model.dto.JobPostingSelectDto;

import java.util.List;

public interface JobPostingService {
    List<JobPostingDto> listAll();
    List<JobPostingSelectDto> listSelect();
}
