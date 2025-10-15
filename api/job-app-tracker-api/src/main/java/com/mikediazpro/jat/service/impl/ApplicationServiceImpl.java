package com.mikediazpro.jat.service.impl;

import com.mikediazpro.jat.entity.Application;
import com.mikediazpro.jat.entity.ApplicationStatus;
import com.mikediazpro.jat.entity.JobPosting;
import com.mikediazpro.jat.model.dto.ApplicationDto;
import com.mikediazpro.jat.model.dto.ApplicationRequest;
import com.mikediazpro.jat.model.dto.ApplicationUpdateRequest;
import com.mikediazpro.jat.repository.ApplicationRepository;
import com.mikediazpro.jat.repository.ApplicationStatusRepository;
import com.mikediazpro.jat.repository.JobPostingRepository;
import com.mikediazpro.jat.service.ApplicationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final JobPostingRepository jobPostingRepository;
    private final ApplicationStatusRepository statusRepository;
    private final ApplicationRepository applicationRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  JobPostingRepository jobPostingRepository,
                                  ApplicationStatusRepository statusRepository) {
        this.applicationRepository = applicationRepository;
        this.jobPostingRepository = jobPostingRepository;
        this.statusRepository = statusRepository;
    }



    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDto> listAll() {
        return applicationRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional
    public ApplicationDto create(ApplicationRequest request) {
        JobPosting jobPosting = jobPostingRepository.findById(request.jobPostingId())
                .orElseThrow(() -> new IllegalArgumentException("Job posting not found"));

        ApplicationStatus status = statusRepository.findById(request.statusCode())
                .orElseThrow(() -> new IllegalArgumentException("Invalid status code"));

        Application app = new Application();
        app.setJobPosting(jobPosting);
        app.setStatus(status);
        app.setAppliedAt(LocalDateTime.now());
        app.setSource(request.source());
        app.setSalaryMin(request.salaryMin());
        app.setSalaryMax(request.salaryMax());
        app.setNotes(request.notes());

        Application saved = applicationRepository.save(app);

        return toDto(saved);
    }

    @Override
    @Transactional
    public ApplicationDto update(String id, ApplicationUpdateRequest request) {
        Application app = applicationRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        JobPosting jobPosting = jobPostingRepository.findById(request.jobPostingId())
                .orElseThrow(() -> new IllegalArgumentException("Job posting not found"));

        ApplicationStatus status = statusRepository.findById(request.statusCode())
                .orElseThrow(() -> new IllegalArgumentException("Invalid status code"));

        // update fields
        app.setJobPosting(jobPosting);
        app.setStatus(status);
        app.setSource(request.source());
        app.setSalaryMin(request.salaryMin());
        app.setSalaryMax(request.salaryMax());
        app.setNotes(request.notes());

        Application saved = applicationRepository.save(app);

        return toDto(saved);
    }


    @Override
    @Transactional
    public void delete(String id) {
        Application app = applicationRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        applicationRepository.delete(app);
    }

    private ApplicationDto toDto(Application a) {
        return new ApplicationDto(
                a.getId().toString(),
                a.getJobPosting().getCompany().getName(),
                a.getJobPosting().getTitle(),
                a.getStatus().getCode(),
                a.getStatus().getLabel(),
                a.getAppliedAt(),
                a.getSource(),
                a.getSalaryMin(),
                a.getSalaryMax()
        );
    }
}