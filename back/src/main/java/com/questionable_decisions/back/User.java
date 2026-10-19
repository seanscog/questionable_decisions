package com.questionable_decisions.back;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("CUSTOMER")
public record User(
        @Id int id,
        String username,
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) String password,
//        @JsonInclude(JsonInclude.Include.NON_NULL)
        String first_name,
        String last_name
) {
}
