comment on column "auth"."questions"."correct_option" is E'many questions to a quiz';
alter table "auth"."questions" alter column "correct_option" drop not null;
alter table "auth"."questions" add column "correct_option" uuid;
