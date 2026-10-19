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
    @Column("CUSTOMER_ID")
    Integer userId,
    @Column("SUBMITTED_AT")
    LocalDateTime submittedAt,
    @Transient
    List<ResponseValue> values
) {
}
