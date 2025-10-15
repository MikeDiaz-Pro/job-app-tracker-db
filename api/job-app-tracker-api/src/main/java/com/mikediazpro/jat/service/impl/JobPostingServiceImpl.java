package com.mikediazpro.jat.service.impl;

import com.mikediazpro.jat.entity.JobPosting;
import com.mikediazpro.jat.model.dto.JobPostingDto;
import com.mikediazpro.jat.model.dto.JobPostingSelectDto;
import com.mikediazpro.jat.repository.JobPostingRepository;
import com.mikediazpro.jat.service.JobPostingService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostingServiceImpl implements JobPostingService {

    private final JobPostingRepository jobPostingRepository;

    public JobPostingServiceImpl(JobPostingRepository jobPostingRepository) {
        this.jobPostingRepository = jobPostingRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobPostingDto> listAll() {
        return jobPostingRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public List<JobPostingSelectDto> listSelect() {
        return jobPostingRepository.findAll().stream()
                .map(this::toSelectDto)
                .toList();
    }


    private JobPostingDto toDto(JobPosting j) {
        return new JobPostingDto(
                j.getId().toString(),
                j.getCompany().getName(),
                j.getTitle(),
                j.getLocation(),
                j.getUrl()
        );
    }

    private JobPostingSelectDto toSelectDto(JobPosting j) {
        return new JobPostingSelectDto(
                j.getId().toString(),
                j.getTitle() + " (" + j.getCompany().getName() + ")"
        );
    }
}
