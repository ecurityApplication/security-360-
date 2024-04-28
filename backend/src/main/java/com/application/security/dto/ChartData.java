package com.application.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChartData {
    private String label;
    private Long value;

    public ChartData(String label, Long value) {
        this.label = label;
        this.value = value;
    }
}
