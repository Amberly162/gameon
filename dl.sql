-- Active: 1733384045799@@127.0.0.1@1433
-- Tạo cơ sở dữ liệu
CREATE DATABASE user_auth;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE user_auth;

-- Tạo bảng người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email_or_phone VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

