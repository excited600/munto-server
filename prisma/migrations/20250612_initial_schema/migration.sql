CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "User" (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  temperature DOUBLE PRECISION NOT NULL,
  profile_picture BYTEA,
  is_host BOOLEAN NOT NULL DEFAULT FALSE,
  is_authenticated BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX User__name__created_at__idx ON "User"(name, created_at);

CREATE TABLE "SocialGathering" (
  id SERIAL PRIMARY KEY,
  host_uuid UUID NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL
);
CREATE INDEX "SocialGathering__start_date__idx" ON "SocialGathering" (start_date); 

CREATE TABLE "Participant" (
  social_gathering_id INTEGER NOT NULL,
  user_uuid UUID NOT NULL,
  PRIMARY KEY (social_gathering_id, user_uuid)
);