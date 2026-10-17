package com.questionable_decisions.back;

import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Configuration
public class UserHandler {
    private UserRepository userRepository;
    public UserHandler(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public Mono<ServerResponse> getUser(@NonNull ServerRequest request) {
        String id = request.pathVariable("id");
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(userRepository.findById(Integer.parseInt(id)).log(), User.class);
    }
    public Mono<ServerResponse> getAllUsers(@NonNull ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .body(userRepository.findAll().log(), User.class);
    }
    public Mono<ServerResponse> addUser(@NonNull ServerRequest request) {

        Mono<User> user = request.bodyToMono(User.class);
        // TODO: hash password
        user.log().map(userRepository::save);
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON)
                .bodyValue("{ok: true}");
    }
}
