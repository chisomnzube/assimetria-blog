const pool = require('../config/database');

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Initializing database...');

    // Create articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        excerpt TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Articles table created successfully');

    // Create index on created_at for faster sorting
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_articles_created_at 
      ON articles(created_at DESC);
    `);

    console.log('✅ Database indexes created');
    console.log('✅ Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  initDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = initDatabase;
