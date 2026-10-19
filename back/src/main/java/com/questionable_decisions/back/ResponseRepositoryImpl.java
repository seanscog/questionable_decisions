package com.questionable_decisions.back;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Repository
public class ResponseRepositoryImpl implements ResponseRepository {
    private final ResponseEntityRepository responses;
    private final ResponseValueRepository values;

    public ResponseRepositoryImpl(ResponseEntityRepository responses, ResponseValueRepository values) {
        this.responses = responses;
        this.values = values;
    }

    @Override
    public Mono<Response> findById(Integer id) {

        return responses.findById(id)
            .flatMap(this::populateValues);
    }

    @Override
    public Flux<Response> findByFormId(String formId) {

        return responses.findByFormId(formId)
            .flatMap(this::populateValues);
    }

    @Override
    @Transactional
    public Mono<Response> save(Response response) {
        Response root =
            new Response(
                null,
                response.formId(),
                LocalDateTime.now(),
                null
            );
        return responses.save(root)
            .flatMap(saved ->
                values.deleteByResponseId(saved.id())
                    .thenMany(
                        Flux.fromIterable(response.values())
                            .map(v -> new ResponseValue(
                                null,
                                saved.id(),
                                v.fieldId(),
                                v.val()
                            ))
                            .flatMap(values::save)
                    )
                    .then(findById(saved.id()))
            );
    }

    @Override
    @Transactional
    public Mono<Void> deleteById(Integer id) {

        return values.deleteByResponseId(id)
            .then(responses.deleteById(id));
    }

    private Mono<Response> populateValues(
        Response response) {

        return values.findByResponseId(response.id())
            .collectList()
            .map(list ->
                new Response(
                    response.id(),
                    response.formId(),
                    response.submitted_at(),
                    list
                ));
    }
}
