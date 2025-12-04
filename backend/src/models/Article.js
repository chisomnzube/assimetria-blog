const pool = require('../config/database');

class Article {
  static async findAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM articles ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM articles WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching article by id:', error);
      throw error;
    }
  }

  static async create({ title, content, author, excerpt }) {
    try {
      const result = await pool.query(
        `INSERT INTO articles (title, content, author, excerpt, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [title, content, author, excerpt]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  static async count() {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM articles');
      return parseInt(result.rows[0].count);
    } catch (error) {
      console.error('Error counting articles:', error);
      throw error;
    }
  }
}

module.exports = Article;
