package com.questionable_decisions.back;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface FormEntityRepository extends ReactiveCrudRepository<Form, Integer> {
    Flux<Form> findByUserId(Integer customerId);
}
