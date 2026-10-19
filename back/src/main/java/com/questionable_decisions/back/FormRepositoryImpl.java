package com.questionable_decisions.back;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

@Repository
public class FormRepositoryImpl implements FormRepository {

    private final FormEntityRepository formRepository;
    private final FormFieldRepository fieldRepository;
    private final FieldOptionRepository optionRepository;

    public FormRepositoryImpl(
        FormEntityRepository formRepository,
        FormFieldRepository fieldRepository,
        FieldOptionRepository optionRepository
    ) {
        this.formRepository = formRepository;
        this.fieldRepository = fieldRepository;
        this.optionRepository = optionRepository;
    }


    @Override
    public Mono<Form> findById(Integer formId) {
        System.out.println("Finding by formid " + formId);
        return formRepository.findById(formId)
            .flatMap(form -> fieldRepository.findByFormIdOrderByOrdinal(formId)
                .flatMap(this::populateOptions)
                .collectList()
                .map(i -> {System.out.println(i);return i;})
                .map(fields -> new Form(
                    form.id(),
                    form.userId(),
                    form.title(),
                    fields
                )));
    }

    private Mono<FormField> populateOptions(FormField field) {

        return optionRepository.findByFieldIdOrderByOrdinal(field.id())
            .collectList()
            .map(options -> new FormField(
                field.id(),
                field.ordinal(),
                field.displayNumber(),
                field.controlType(),
                field.label(),
                field.formPage(),
                field.formId(),
                options
            ));
    }

    @Override
    public Flux<Form> findByUserId(Integer userId) {

        return formRepository.findByUserId(userId)
                .flatMap(form -> findById(form.id()));
    }

    @Override
    @Transactional
    public Mono<Form> save(Form form) {
        System.out.println(form);
        return formRepository
            .save(new Form(null, form.userId(), form.title(), null))
            .flatMap(saved -> fieldRepository.deleteByFormId(saved.id()).log()
                .thenMany(
                    Flux.fromIterable(Objects.requireNonNullElse(form.fields(), List.of()))
                        .flatMap(field -> {
                            System.out.println(field);
                            return fieldRepository.save(new FormField(
                                    null,
                                    field.ordinal(),
                                    field.displayNumber(),
                                    field.controlType(),
                                    field.label(),
                                    field.formPage(),
                                    saved.id(),
                                    null
                                ))
                                .flatMap(savedField ->
                                    optionRepository
                                        .deleteByFieldId(savedField.id())
                                        .thenMany(
                                            Flux.fromIterable(Objects.requireNonNullElse(field.options(), List.of()))
                                                .map(option -> new FieldOption(
                                                    null,
                                                    option.ordinal(),
                                                    option.label(),
                                                    savedField.id()))
                                                .flatMap(optionRepository::save)
                                        )
                                        .then(Mono.just(savedField))
                                )
                        ;})
                )
                .then(findById(saved.id())));
    }

    @Override
    @Transactional
    public Mono<Void> deleteById(Integer formId) {

        return fieldRepository.findByFormIdOrderByOrdinal(formId)
            .flatMap(field ->
                optionRepository.deleteByFieldId(field.id()))
            .then(fieldRepository.deleteByFormId(formId))
            .then(formRepository.deleteById(formId));
    }
}
