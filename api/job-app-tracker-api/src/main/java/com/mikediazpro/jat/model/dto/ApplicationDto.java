package com.mikediazpro.jat.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ApplicationDto(
        String id,
        String companyName,
        String jobTitle,
        String statusCode,
        String statusLabel,
        LocalDateTime appliedAt,
        String source,
        BigDecimal salaryMin,
        BigDecimal salaryMax
) {}