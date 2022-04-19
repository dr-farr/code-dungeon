alter table "auth"."quiz_categories" add column "updated_at" timestamptz
 null default now();
