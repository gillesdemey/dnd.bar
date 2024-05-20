# DND Bar Supabase

## Dependencies

The following packages are required to be installed; (currently requires the supabase beta)

`brew install just supabase/tap/supabase-beta`

## Development

Run `just start` to start the supabase server and generate the types.

Run `just stop` to shut down the supabase environment.

## API

You can run the server locally with Deno.

`SUPABASE_URL="http://localhost:54321" SUPABASE_SERVICE_ROLE_KEY=<run supabase status> deno run -A supabase/functions/bar/index.ts`

Go to `http://127.0.0.1:8000/bar/sessions/2b4b2db3-00e0-4d43-ae74-e9f5a7b8dd32/orders` in the browser.

Or with `supabase`

Go to `http://127.0.0.1:54321/functions/v1/bar/sessions/2b4b2db3-00e0-4d43-ae74-e9f5a7b8dd32/orders` in the browser.

## UI

Run `npm run dev` in the `ui/` folder and navigate to `http://localhost:5173/sessions/2b4b2db3-00e0-4d43-ae74-e9f5a7b8dd32`.

## Console

Go to http://localhost:54321 in the browser.
