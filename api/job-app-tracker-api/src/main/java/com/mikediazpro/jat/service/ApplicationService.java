package com.mikediazpro.jat.service;

import com.mikediazpro.jat.model.dto.ApplicationDto;
import java.util.List;

public interface ApplicationService {
    List<ApplicationDto> listAll();
}