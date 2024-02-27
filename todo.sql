-- should be moved to /migrations as 0000_xxx.sql

DROP TABLE IF EXISTS todo;
CREATE TABLE IF NOT EXISTS todo (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  checked INTEGER DEFAULT 0 NOT NULL
);

INSERT INTO todo (id, title)
VALUES ('60e2aea6-f4c4-41ab-a629-1a5187d3e661', 'First TODO');
