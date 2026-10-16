package com.questionable_decisions.back;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User,Integer> {
    @Query("SELECT * FROM customer WHERE username = :username LIMIT 1")
    public Mono<User> findByUsername(String username);
}
