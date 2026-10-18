CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR
);
INSERT INTO customer (username)
VALUES ('anonymous');

CREATE TABLE IF NOT EXISTS form (
    id VARCHAR PRIMARY KEY,
    customer_id INTEGER REFERENCES customer(id)
);
CREATE TABLE IF NOT EXISTS form_field (
    ordinal INTEGER,
    display_number INTEGER,
    field_type TEXT,
    label TEXT,
    form_id VARCHAR NOT NULL REFERENCES form(id),
    form_page INTEGER NOT NULL,
    PRIMARY KEY(form_id, ordinal)
);