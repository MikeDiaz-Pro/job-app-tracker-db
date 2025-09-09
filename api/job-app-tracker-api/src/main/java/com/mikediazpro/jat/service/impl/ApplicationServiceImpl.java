package com.mikediazpro.jat.service.impl;

import com.mikediazpro.jat.entity.Application;
import com.mikediazpro.jat.model.dto.ApplicationDto;
import com.mikediazpro.jat.repository.ApplicationRepository;
import com.mikediazpro.jat.service.ApplicationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationDto> listAll() {
        return applicationRepository.findAll().stream()
                .map(this::toDto)
                .toList();
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