CREATE DATABASE Lanidades;

CREATE TABLE item_stock(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    stock VARCHAR(255) NOT NULL,
    wall VARCHAR(255) NOT NULL,
    box VARCHAR(255) NOT NULL,
    origin VARCHAR(255),
    details VARCHAR(255),
    deleted VARCHAR(100)
);


CREATE TABLE users(
    id BIGSERIAL NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

INSERT INTO users (username, password, fullname) 
VALUES ('LanidadesBoss', '$2b$10$Bv2NVz6S4XkAIxs4FqCAfev5r4DS8q6CEzq52aaZGTwNt75d.lZQ2', 'LanidadesBoss');
INSERT INTO users (username, password, fullname) 
VALUES ('Stock', '$2b$10$1CNvhhsSUvXIqBg/nc9PPeI0AZr6PsmQlr/jZ6QqYSubFAUFcxW1u', 'Stock');
INSERT INTO users (username, password, fullname) 
VALUES ('Lanidades', '$2b$10$.gbARKsuhendcZTQGTAZOOYNM18eRVCsKD6CIDuUn1yjSLY7u6B.2', 'Ventas');