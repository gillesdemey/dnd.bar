-- -------------------------------------------------------------
-- TablePlus 6.0.0(550)
--
-- https://tableplus.com/
--
-- Database: postgres
-- Generation Time: 2024-05-20 02:47:13.0280
-- -------------------------------------------------------------


-- DROP TABLE IF EXISTS "public"."orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int8 NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "session" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "round" numeric NOT NULL DEFAULT '0'::numeric,
    "item" varchar NOT NULL,
    "price" float8 NOT NULL DEFAULT '0'::double precision,
    PRIMARY KEY ("id")
);

-- Comments
COMMENT ON TABLE "public"."orders" IS 'list of all orders';

-- Indices
CREATE UNIQUE INDEX orders_id_key ON public.orders USING btree (id);
CREATE INDEX orders_session_idx ON public.orders USING btree (session);
