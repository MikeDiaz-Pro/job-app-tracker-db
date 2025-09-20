package com.mikediazpro.jat.controller;

import com.mikediazpro.jat.model.dto.ApplicationDto;
import com.mikediazpro.jat.model.dto.ApplicationRequest;
import com.mikediazpro.jat.model.dto.ApplicationUpdateRequest;
import com.mikediazpro.jat.service.ApplicationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "Applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<ApplicationDto> list() {
        return applicationService.listAll();
    }

    @PostMapping
    public ResponseEntity<ApplicationDto> create(@Valid @RequestBody ApplicationRequest request) {
        ApplicationDto dto = applicationService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDto> update(
            @PathVariable String id,
            @Valid @RequestBody ApplicationUpdateRequest request
    ) {
        ApplicationDto dto = applicationService.update(id, request);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        applicationService.delete(id);
        return ResponseEntity.noContent().build();
    }

}