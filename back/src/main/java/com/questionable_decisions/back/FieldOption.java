package com.questionable_decisions.back;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("FIELD_OPTION")
public record FieldOption(
    @Id
    Integer id,
    Integer ordinal,
    String label,
    Integer fieldId
) {}
