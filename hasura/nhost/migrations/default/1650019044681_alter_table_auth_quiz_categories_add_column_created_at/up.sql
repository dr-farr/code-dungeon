alter table "auth"."quiz_categories" add column "created_at" timestamptz
 null default now();
