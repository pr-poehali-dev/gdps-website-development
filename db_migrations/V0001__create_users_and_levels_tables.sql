CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stars INTEGER DEFAULT 0,
    completed_levels INTEGER DEFAULT 0,
    achievements INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS levels (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author_id INTEGER REFERENCES users(id),
    difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 10),
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_levels_author ON levels(author_id);
CREATE INDEX IF NOT EXISTS idx_levels_downloads ON levels(downloads DESC);