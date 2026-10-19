package com.questionable_decisions.back;

import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Configuration
public class FormHandler {
    private final FormRepository formRepository;
    public FormHandler(FormRepository formRepository){
        this.formRepository = formRepository;
    }
    public Mono<ServerResponse> getForm(@NonNull ServerRequest request) {
        String id = request.pathVariable("id");
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(formRepository.findById(Integer.valueOf(id)).log(), User.class);
    }
    public Mono<ServerResponse> getFormsByUserId(@NonNull ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(formRepository.findByUserId(Integer.parseInt(request.pathVariable("id"))).log(), User.class);
    }

    public Mono<ServerResponse> addForm(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Form.class)
            .flatMap(formRepository::save)
            .flatMap(f->ServerResponse.ok().bodyValue(f));
    }
}
