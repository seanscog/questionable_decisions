package com.questionable_decisions.back;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicate;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;

@Configuration(proxyBeanMethods = false)
public class Router {
    @Bean
    public RouterFunction<ServerResponse> route(UserHandler userHandler) {
        // https://docs.spring.io/spring-framework/reference/web/webflux-functional.html#webflux-fn-resource
        RequestPredicate spaPredicate = path("/api/**").or(path("/error")).negate();
        ClassPathResource index = new ClassPathResource("static/index.html");

        return RouterFunctions.route().resource(spaPredicate, index)
                .path("/api", builder->builder
                        .GET("/user/{id}", accept(MediaType.APPLICATION_JSON), userHandler::getUser)
                        .GET("/user", accept(MediaType.APPLICATION_JSON), userHandler::getAllUsers)
                        .POST("/user", contentType(MediaType.APPLICATION_JSON), userHandler::addUser)
                ).build();
    }

}