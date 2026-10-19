package com.questionable_decisions.back;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FormRepository {

    Mono<Form> findById(Integer formId);

    Flux<Form> findByUserId(Integer customerId);

    Mono<Form> save(Form form);

    Mono<Void> deleteById(Integer formId);
}
