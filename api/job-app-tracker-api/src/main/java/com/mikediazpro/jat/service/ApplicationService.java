package com.mikediazpro.jat.service;

import com.mikediazpro.jat.model.dto.ApplicationDto;
import com.mikediazpro.jat.model.dto.ApplicationRequest;
import com.mikediazpro.jat.model.dto.ApplicationUpdateRequest;

import java.util.List;

public interface ApplicationService {
    List<ApplicationDto> listAll();
    ApplicationDto create(ApplicationRequest request);
    ApplicationDto update(String id, ApplicationUpdateRequest request);
    void delete(String id);
}

