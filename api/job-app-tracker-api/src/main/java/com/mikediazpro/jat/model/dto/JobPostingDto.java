package com.mikediazpro.jat.model.dto;

public record JobPostingDto (
        String id,
        String company_name,
        String title,
        String location,
        String url
) {}
