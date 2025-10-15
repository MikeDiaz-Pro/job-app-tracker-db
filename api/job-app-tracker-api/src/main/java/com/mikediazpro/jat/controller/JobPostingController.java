package com.mikediazpro.jat.controller;

import com.mikediazpro.jat.entity.JobPosting;
import com.mikediazpro.jat.model.dto.JobPostingDto;
import com.mikediazpro.jat.model.dto.JobPostingSelectDto;
import com.mikediazpro.jat.service.JobPostingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/job_posting")
@Tag(name = "JobPostings")
public class JobPostingController {
    private final JobPostingService jobPostingService;

    public JobPostingController(JobPostingService jobPostingService) {
        this.jobPostingService = jobPostingService;
    }

    @GetMapping
    public List<JobPostingDto> list() {
        return jobPostingService.listAll();
    }

    @GetMapping(value = "/select")
    public List<JobPostingSelectDto> listSelect() {
        return jobPostingService.listSelect();
    }
}
