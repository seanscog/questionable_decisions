package com.questionable_decisions.back;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;

@Table("FORM")
public record Form(
    @Id Integer id,
    @Column("CUSTOMER_ID")
    Integer userId,
    String title,
    @Transient
    List<FormField> fields
) {}
