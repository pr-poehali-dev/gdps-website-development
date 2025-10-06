CREATE TABLE IF NOT EXISTS music (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    uploader_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_music_uploader ON music(uploader_id);
CREATE INDEX IF NOT EXISTS idx_music_created ON music(created_at DESC);