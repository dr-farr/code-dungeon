alter table "auth"."questions" add column "created_at" timestamptz
 null default now();
