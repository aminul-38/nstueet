USE NSTUEET;

SET SQL_SAFE_UPDATES = 0;
SET SQL_SAFE_UPDATES = 1;

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes;
SELECT * FROM comments;
SELECT * FROM follows_table;

-- user table


UPDATE users SET profile_picture = "default-profile-picture.png";
UPDATE users SET profile_picture = "aminul Imam.jpg" WHERE student_id="MUH2101038M";

update users set bio = "CSTE | NSTU\nProgrammer\nFull stack developer." where student_id='ASH2101008M';
delete from posts where created_at ='2025-01-25 01:12:57' ;
delete from posts where post_id =20  ;


DELETE FROM users WHERE created_at = '2025-01-16 23:25:30';
DELETE FROM users WHERE student_id = 'MUH0201002M';
DELETE FROM users WHERE student_id = 'ASH2101014M';
DELETE FROM users WHERE student_id = 'MUH2101038M';

-- post table
SELECT * FROM posts 
WHERE student_id IN 
	(SELECT following_id 
     FROM follows_table 
     WHERE follower_id = 'MUH2101038M') 
     ORDER BY post_id DESC;


-- likes table
insert into likes(post_id,student_id) values
(2, 'MUH2101038M'),
(2, 'ASH2101008M'),
(3, 'ASH2101014M'),
(3, 'MUH2101028M');

SELECT 
    likes.like_id, 
    likes.post_id, 
    likes.student_id, 
    users.name
FROM likes
LEFT JOIN users ON likes.student_id = users.student_id
WHERE likes.post_id = 1;

DELETE FROM likes WHERE post_id = 1 and student_id = 'ASH2101008M';
INSERT INTO likes (post_id, student_id) values (1,'ASH2101008M');


-- comment table
insert into comments(post_id, student_id, content) values
(4, 'MUH2101038M','Nice post thanks for sharing.'),
(1,'MUH2101038M','Nice post thanks for sharing.'),
(2,'MUH2101038M','Nice post thanks for sharing.'),
(4,'MUH2101038M','Nice post thanks for sharing.'),
(4,'ASH2101014M','Nice post thanks for sharing.'),
(4,'ASH2101014M','Nice post thanks for sharing.');

SELECT 
	comments.comment_id,
    comments.post_id,
    comments.student_id,
    comments.content,
    comments.created_at,
    users.name
FROM comments
LEFT JOIN users ON comments.student_id = users.student_id
WHERE post_id = 3
ORDER BY comments.comment_id DESC;



-- follows table
insert into follows_table (follower_id, following_id) values
('MUH2101038M' ,'MUH2101038M'),
("ASH2101008M","ASH2101008M"),
("ASH2101014M","ASH2101014M");

drop TABLE follows_table;





