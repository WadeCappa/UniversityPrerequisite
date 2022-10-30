// before writing any inserts, find an optimal schema (a conversion from your SQL schema)
CREATE CONSTRAINT UsersHaveUniqueEmails IF NOT EXISTS
FOR (n:User)
REQUIRE n.email IS UNIQUE