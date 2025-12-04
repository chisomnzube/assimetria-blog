const Article = require('../models/Article');
const pool = require('../config/database');

// Sample articles to seed the database
const sampleArticles = [
  {
    title: 'The Future of Artificial Intelligence in Healthcare',
    author: 'AI Blog Writer',
    excerpt: 'Artificial intelligence is revolutionizing healthcare by enabling faster diagnoses, personalized treatment plans, and improved patient outcomes...',
    content: `Artificial intelligence is revolutionizing healthcare by enabling faster diagnoses, personalized treatment plans, and improved patient outcomes. As we look toward the future, the integration of AI in medical practices promises to transform how we approach health and wellness.

## The Current State of AI in Healthcare

Today, AI technologies are already being used in various aspects of healthcare, from diagnostic imaging to drug discovery. Machine learning algorithms can analyze medical images with remarkable accuracy, often detecting patterns that human eyes might miss. This capability is particularly valuable in early cancer detection and other critical diagnoses.

## Personalized Medicine

One of the most exciting applications of AI in healthcare is personalized medicine. By analyzing vast amounts of patient data, including genetic information, lifestyle factors, and medical history, AI systems can recommend treatments tailored to individual patients. This approach represents a significant shift from the one-size-fits-all model of traditional medicine.

**Key Benefits:**
- Improved treatment efficacy
- Reduced adverse reactions
- Cost-effective healthcare delivery
- Better patient outcomes

## Predictive Analytics

AI-powered predictive analytics are helping healthcare providers anticipate patient needs before issues become critical. These systems can identify patients at risk of developing chronic conditions, allowing for early intervention and preventive care.

## The Road Ahead

While the potential is enormous, challenges remain. Data privacy, algorithmic bias, and the need for regulatory frameworks are important considerations as we move forward. The successful integration of AI in healthcare will require collaboration between technologists, medical professionals, and policymakers.

The future of AI in healthcare is bright, promising a world where medical care is more accurate, accessible, and personalized than ever before.`
  },
  {
    title: 'Sustainable Energy Solutions for Tomorrow',
    author: 'AI Blog Writer',
    excerpt: 'As climate change accelerates, the world is turning to sustainable energy solutions to power our future. From solar to wind to emerging technologies...',
    content: `As climate change accelerates, the world is turning to sustainable energy solutions to power our future. From solar to wind to emerging technologies, the renewable energy sector is experiencing unprecedented growth and innovation.

## The Renewable Revolution

The transition to renewable energy is no longer just an environmental imperative—it's becoming an economic reality. Solar and wind power are now cost-competitive with fossil fuels in many regions, making sustainable energy an attractive option for both developed and developing nations.

## Solar Power Innovation

Solar technology has made remarkable strides in recent years. **Next-generation solar panels** achieve higher efficiency rates, while innovative applications like solar windows and flexible solar films are expanding the possibilities for renewable energy generation.

### Key Developments:
- Perovskite solar cells with 30%+ efficiency
- Building-integrated photovoltaics
- Solar-powered desalination plants
- Space-based solar power concepts

## Wind Energy Expansion

Wind power continues to grow as a major renewable energy source. Offshore wind farms are particularly promising, taking advantage of stronger and more consistent winds over the ocean. Floating wind turbines are opening up new areas for development in deeper waters.

## Energy Storage Solutions

One of the biggest challenges for renewable energy has been storage. Battery technology is advancing rapidly, with new solutions emerging:

- Lithium-ion improvements
- Solid-state batteries
- Grid-scale storage systems
- Hydrogen fuel cells

## The Path Forward

The future of energy is undoubtedly renewable. With continued investment in research and infrastructure, sustainable energy solutions will power our homes, businesses, and transportation systems. The transition won't happen overnight, but every step toward renewable energy is a step toward a more sustainable future for our planet.`
  },
  {
    title: 'The Rise of Remote Work Culture',
    author: 'AI Blog Writer',
    excerpt: 'The COVID-19 pandemic accelerated a workplace transformation that was already underway. Remote work has shifted from a perk to a standard practice...',
    content: `The COVID-19 pandemic accelerated a workplace transformation that was already underway. Remote work has shifted from a perk to a standard practice for millions of workers worldwide, fundamentally changing how we think about work and productivity.

## The New Normal

What began as a temporary measure has evolved into a permanent shift in work culture. Companies that once required in-office presence have discovered that remote work can be just as productive, if not more so, than traditional office arrangements.

## Benefits of Remote Work

The advantages of remote work extend to both employees and employers:

**For Employees:**
- Improved work-life balance
- Eliminated commute time
- Flexibility in location
- Reduced expenses

**For Employers:**
- Access to global talent pools
- Reduced overhead costs
- Increased employee satisfaction
- Environmental benefits

## Challenges and Solutions

Despite its benefits, remote work presents unique challenges. Communication can be more difficult, and some employees struggle with isolation or maintaining boundaries between work and personal life.

### Addressing the Challenges

Organizations are developing innovative solutions:
- Regular virtual team-building activities
- Clear communication protocols
- Dedicated collaboration tools
- Mental health support programs

## The Technology Enablers

The success of remote work depends heavily on technology. **Video conferencing platforms**, project management tools, and cloud-based collaboration software have become essential infrastructure for modern businesses.

## Looking Ahead

The future of work is likely to be hybrid, combining the benefits of remote work with occasional in-person collaboration. This flexibility represents a fundamental shift in workplace culture that will continue to evolve as technology advances and organizations adapt to changing employee expectations.

The rise of remote work culture is more than just a trend—it's a transformation in how we define the workplace itself.`
  }
];

async function seedSampleArticles() {
  try {
    console.log('🌱 Starting article seeding with sample data...');

    // Check if we already have articles
    const count = await Article.count();
    
    if (count >= 3) {
      console.log(`✅ Database already has ${count} articles. Skipping seed.`);
      return;
    }

    const articlesNeeded = Math.min(3, sampleArticles.length);
    console.log(`📝 Adding ${articlesNeeded} sample articles...`);

    for (let i = 0; i < articlesNeeded; i++) {
      const articleData = sampleArticles[i];
      const article = await Article.create(articleData);
      console.log(`✅ Created: "${article.title}"`);
    }

    console.log('\n✅ Seeding complete! All sample articles added.');
    console.log('\n💡 Note: These are sample articles. To generate AI articles, ensure your OpenAI API key has credits.');
    
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  seedSampleArticles()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = seedSampleArticles;
