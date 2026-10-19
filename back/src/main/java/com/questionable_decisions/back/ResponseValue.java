package com.questionable_decisions.back;

import org.springframework.data.annotation.Id;

public record ResponseValue(
    @Id
    Integer id,
    Integer responseId,
    Integer fieldId,
    String val
) {}
