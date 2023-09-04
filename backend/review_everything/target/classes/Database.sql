create user 'review_everything-owner'@'%' identified by 'review_everything';
select user from mysql.user;

create database review_everything;

grant all privileges on review_everything.* to 'review_everything-owner'@'%';

flush privileges;