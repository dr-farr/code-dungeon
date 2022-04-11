alter table "auth"."quizes"
  add constraint "quizes_quiz_category_id_fkey"
  foreign key ("quiz_category_id")
  references "auth"."quiz_categories"
  ("id") on update restrict on delete restrict;
