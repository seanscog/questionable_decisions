package com.questionable_decisions.back;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.net.URI;

@Configuration
public class ResponseHandler {
    ResponseRepository responseRepository;
    ResponseHandler(ResponseRepository repo) {
        responseRepository = repo;
    }

    public Mono<ServerResponse> submitResponse(ServerRequest serverRequest) {
        return serverRequest.bodyToMono(Response.class)
            .flatMap(r->responseRepository.save(r))
            .flatMap(r->ServerResponse.created(URI.create("response/" + r.id())).build());
    }

    public Mono<ServerResponse> getResponses(ServerRequest serverRequest) {
        String formId = serverRequest.pathVariable("id");
        return ServerResponse.ok().body(responseRepository.findByFormId(formId), Response.class);
    }
}
