const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const topics = [
  'The Future of Artificial Intelligence in Healthcare',
  'Sustainable Energy Solutions for Tomorrow',
  'The Rise of Remote Work Culture',
  'Blockchain Technology Beyond Cryptocurrency',
  'Mental Health in the Digital Age',
  'Space Exploration and Human Settlement',
  'The Evolution of Mobile Technology',
  'Cybersecurity Trends and Challenges',
  'The Impact of Social Media on Society',
  'Climate Change and Environmental Conservation',
  'Quantum Computing Breakthroughs',
  'The Gig Economy and Future of Work',
  'Virtual Reality in Education',
  'Autonomous Vehicles Revolution',
  'The Ethics of Genetic Engineering',
  'Smart Cities and Urban Development',
  'The Future of Food Technology',
  'Privacy in the Age of Big Data',
  'Renewable Energy Innovations',
  'The Metaverse and Digital Identity'
];

async function generateArticle() {
  try {
    // Pick a random topic
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    console.log(`🤖 Generating article about: ${topic}`);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional tech blogger who writes engaging, informative articles. Write in a conversational yet professional tone.'
        },
        {
          role: 'user',
          content: `Write a comprehensive blog article about "${topic}". 
          
          The article should:
          - Be 600-800 words long
          - Have an engaging introduction
          - Include 3-4 main points with explanations
          - Have a thoughtful conclusion
          - Be informative and well-structured
          - Use markdown formatting (headings, bold, lists where appropriate)
          
          Only provide the article content, no title.`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500
    });

    const content = completion.choices[0].message.content.trim();
    
    // Generate excerpt (first 150 characters)
    const excerpt = content.substring(0, 150).replace(/\n/g, ' ') + '...';

    return {
      title: topic,
      content: content,
      author: 'AI Blog Writer',
      excerpt: excerpt
    };
  } catch (error) {
    console.error('❌ Error generating article:', error.message);
    throw error;
  }
}

module.exports = { generateArticle };
