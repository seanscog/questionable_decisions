package com.questionable_decisions.back;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface ResponseValueRepository extends ReactiveCrudRepository<ResponseValue, Integer> {
    Flux<ResponseValue> findByResponseId(Integer responseId);
    Mono<Void> deleteByResponseId(Integer responseId);
}
