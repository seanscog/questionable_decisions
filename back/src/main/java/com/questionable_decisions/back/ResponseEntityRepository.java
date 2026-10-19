package com.questionable_decisions.back;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ResponseEntityRepository extends ReactiveCrudRepository<Response, Integer> {

    Flux<Response> findByFormId(String formId);
}
