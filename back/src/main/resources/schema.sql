CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR
);
INSERT INTO customer (username, first_name)
VALUES ('anon', 'anon');