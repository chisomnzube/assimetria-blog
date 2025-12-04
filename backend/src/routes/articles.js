const express = require('express');
const Article = require('../models/Article');
const { generateNow } = require('../services/articleJob');

const router = express.Router();

// GET /api/articles - Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch articles',
      error: error.message
    });
  }
});

// GET /api/articles/:id - Get single article
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch article',
      error: error.message
    });
  }
});

// POST /api/articles/generate - Generate new article
router.post('/generate', async (req, res) => {
  try {
    console.log('📝 Manual article generation triggered');
    const article = await generateNow();
    res.status(201).json({
      success: true,
      message: 'Article generated successfully',
      data: article
    });
  } catch (error) {
    console.error('Error generating article:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate article',
      error: error.message
    });
  }
});

module.exports = router;
