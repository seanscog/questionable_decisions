package com.questionable_decisions.back;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Table("FORM_FIELD")
public record FormField(
    @Id
    Integer id,
    Integer ordinal,
    @Column("DISPLAY_NUMBER")
    Integer displayNumber,
    @Column("CONTROL_TYPE")
    String controlType,
    String label,
    @Column("FORM_PAGE")
    Integer formPage,
    @Column("FORM_ID")
    Integer formId,
    @Transient
    List<FieldOption> options
){}
