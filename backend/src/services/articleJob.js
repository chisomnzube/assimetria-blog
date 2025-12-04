const cron = require('node-cron');
const { generateArticle } = require('./aiClient');
const Article = require('../models/Article');

// Schedule article generation every day at 10:00 AM
function scheduleArticleGeneration() {
  // Run daily at 10:00 AM
  cron.schedule('0 10 * * *', async () => {
    console.log('⏰ Running scheduled article generation...');
    try {
      const articleData = await generateArticle();
      const article = await Article.create(articleData);
      console.log(`✅ Auto-generated article: "${article.title}"`);
    } catch (error) {
      console.error('❌ Failed to generate scheduled article:', error.message);
    }
  });

  console.log('📅 Article generation scheduled for 10:00 AM daily');
}

// Generate article immediately (for manual triggering)
async function generateNow() {
  console.log('🚀 Generating article now...');
  try {
    const articleData = await generateArticle();
    const article = await Article.create(articleData);
    console.log(`✅ Generated article: "${article.title}"`);
    return article;
  } catch (error) {
    console.error('❌ Failed to generate article:', error.message);
    throw error;
  }
}

module.exports = { scheduleArticleGeneration, generateNow };
