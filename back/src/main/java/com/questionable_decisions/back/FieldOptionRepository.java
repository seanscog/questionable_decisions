package com.questionable_decisions.back;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FieldOptionRepository extends ReactiveCrudRepository<FieldOption, Integer> {
    Flux<FieldOption> findByFieldIdOrderByOrdinal(Integer formId);
    Mono<Void> deleteByFieldId(Integer fieldId);
}
