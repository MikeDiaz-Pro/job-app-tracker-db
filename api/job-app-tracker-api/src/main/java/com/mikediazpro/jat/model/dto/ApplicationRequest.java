package com.mikediazpro.jat.model.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.UUID;

public record ApplicationRequest(
        @NotNull UUID jobPostingId,
        @NotBlank String statusCode,
        String source,
        BigDecimal salaryMin,
        BigDecimal salaryMax,
        String notes
) {}