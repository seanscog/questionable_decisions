package com.questionable_decisions.back;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ResponseRepository {
    Mono<Response> findById(Integer id);

    Flux<Response> findByFormId(String formId);

    Mono<Response> save(Response response);

    Mono<Void> deleteById(Integer id);
}
