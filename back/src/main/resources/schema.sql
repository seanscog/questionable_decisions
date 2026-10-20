CREATE TABLE IF NOT EXISTS customer (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    password VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR
);
INSERT INTO customer (username, password, first_name, last_name)
VALUES ('scott', 'password', 'Scott', 'Burman');

CREATE TABLE IF NOT EXISTS form (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customer(id),
    title TEXT
);
CREATE TABLE IF NOT EXISTS form_field (
    id SERIAL PRIMARY KEY,
    ordinal INTEGER,
    display_number INTEGER,
    control_type TEXT,
    label TEXT,
    form_page INTEGER NOT NULL,
    form_id INTEGER NOT NULL REFERENCES form(id)
);
CREATE TABLE IF NOT EXISTS field_option (
    id SERIAL PRIMARY KEY,
    ordinal INTEGER,
    label TEXT,
    field_id INTEGER NOT NULL references form_field
);

INSERT INTO form (customer_id, title)
VALUES (1, 'Thumbs');

INSERT INTO form_field (ordinal, display_number, control_type, label, form_page, form_id)
VALUES
    (1, 1, 'radio', 'How is everyone feeling?', 1, 1),
    (2, 2, 'text', 'Whose baby is the cutest?', 1, 1),
    (3, 3, 'text', 'Are you ready for a party?', 1, 1);

INSERT INTO field_option (ordinal, label, field_id)
VALUES
    (1, '👍', 1),
    (2, '👎', 1),
    (3, '🫰', 1);

CREATE TABLE IF NOT EXISTS response (
    id SERIAL PRIMARY KEY,
    form_id INTEGER NOT NULL REFERENCES form(id),
    customer_id INTEGER,
    submitted_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS response_value (
    id SERIAL PRIMARY KEY,
    response_id INTEGER NOT NULL REFERENCES response(id),
    field_id INTEGER NOT NULL REFERENCES form_field(id),
    val TEXT,
    UNIQUE(response_id, field_id)
);

CREATE INDEX idx_response_form_id
    ON response(form_id);

CREATE INDEX idx_response_value_response_id
    ON response_value(response_id);

CREATE INDEX idx_response_value_field_id
    ON response_value(field_id);

CREATE VIEW response_view AS
SELECT  
    response.id,
    response.form_id,
    COALESCE(response.customer_id, 0) AS customer_id,
    response.submitted_at,
    COALESCE(customer.username, 'unknown') AS username
FROM response
LEFT JOIN customer
    ON customer.id = response.customer_id;