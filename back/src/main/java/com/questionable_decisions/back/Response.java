package com.questionable_decisions.back;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.List;

public record Response(
    @Id
    Integer id,
    @Column("FORM_ID")
    Integer formId,
    LocalDateTime submitted_at,
    @Transient
    List<ResponseValue> values
) {
}
