alter table "auth"."questions" add column "updated_at" timestamptz
 null default now();
