const { generateArticle } = require('../services/aiClient');
const Article = require('../models/Article');
const pool = require('../config/database');

async function seedArticles() {
  try {
    console.log('🌱 Starting article seeding...');

    // Check if we already have articles
    const count = await Article.count();
    
    if (count >= 3) {
      console.log(`✅ Database already has ${count} articles. Skipping seed.`);
      return;
    }

    const articlesNeeded = 3 - count;
    console.log(`📝 Generating ${articlesNeeded} articles...`);

    for (let i = 0; i < articlesNeeded; i++) {
      console.log(`\n📄 Generating article ${i + 1}/${articlesNeeded}...`);
      const articleData = await generateArticle();
      const article = await Article.create(articleData);
      console.log(`✅ Created: "${article.title}"`);
      
      // Add a small delay to avoid rate limits
      if (i < articlesNeeded - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log('\n✅ Seeding complete! All articles generated.');
    
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  seedArticles()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = seedArticles;
