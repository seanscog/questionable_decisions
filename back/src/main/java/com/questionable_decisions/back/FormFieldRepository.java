package com.questionable_decisions.back;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FormFieldRepository extends ReactiveCrudRepository<FormField, Integer> {
    Flux<FormField> findByFormIdOrderByOrdinal(Integer formId);

    Mono<Void> deleteByFormId(Integer formId);
}
