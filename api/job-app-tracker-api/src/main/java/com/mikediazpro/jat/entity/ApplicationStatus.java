package com.mikediazpro.jat.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "application_status")
public class ApplicationStatus {

    @Id
    @Column(length = 30)
    private String code; // applied, in_review, interview, offer, rejected

    @Column(nullable = false, length = 60)
    private String label;

    @Column(name = "class_name", length = 50)
    private String className;

    public ApplicationStatus() {}

    public ApplicationStatus(String code, String label, String className) {
        this.code = code;
        this.label = label;
        this.className = className;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }
}