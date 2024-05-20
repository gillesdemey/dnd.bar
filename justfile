start: generate
  supabase start
  supabase functions serve

stop:
  supabase stop

generate:
  supabase gen types typescript --local | tee -a ./ui/src/database.types.ts ./supabase/functions/api/database.types.ts >/dev/null

fmt:
  prettier --write
