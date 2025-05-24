CREATE DATABASE IF NOT EXISTS NSTUEET;
USE NSTUEET;

-- create user table which contain user information
CREATE TABLE users(
	student_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(255),
    profile_picture VARCHAR(255) DEFAULT "G:\Web Development\Project\NSTUEET\NSTUEET\src\Images\Other\default-profile-picture.png",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users MODIFY profile_picture VARCHAR(255) DEFAULT "default-profile-picture.png";

-- Create Post table which contain information about posts
CREATE TABLE posts(
	post_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(12),
    content VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(student_id) ON DELETE CASCADE
);

-- Create Like table which contain like information
CREATE TABLE likes(
	like_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    student_id VARCHAR(12),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(student_id) ON DELETE CASCADE
);

-- Create comment table containing comment information
CREATE TABLE comments(
	comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    student_id VARCHAR(12),
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(student_id) ON DELETE CASCADE
);

-- Create followers table to maintain follow list
CREATE TABLE follows_table(
	follower_id VARCHAR(12),
    following_id VARCHAR(12),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(student_id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(student_id) ON DELETE CASCADE
);



