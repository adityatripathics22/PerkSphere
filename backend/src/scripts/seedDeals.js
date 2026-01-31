require('dotenv').config();
const mongoose = require('mongoose');
const Deal = require('../models/Deal');

const deals = [
  {
    title: 'AWS Credits for Startups',
    description: 'Get up to $100,000 in AWS credits to build and scale your product. Perfect for early-stage startups building on the cloud.',
    category: 'cloud',
    partnerName: 'Amazon Web Services',
    isLocked: false,
    eligibilityConditions: 'Must be a registered startup. Apply through AWS Activate.',
    discountInfo: 'Up to $100,000 in credits',
  },
  {
    title: 'Google Cloud Startup Program',
    description: 'Access Google Cloud credits and technical support. Build with the same infrastructure that powers Google.',
    category: 'cloud',
    partnerName: 'Google Cloud',
    isLocked: true,
    eligibilityConditions: 'Verified startup. Team size and traction reviewed.',
    discountInfo: 'Credits + dedicated support',
  },
  {
    title: 'HubSpot Marketing Suite',
    description: 'Full marketing, sales, and CRM suite at a discounted rate for startups. Automate and scale your growth.',
    category: 'marketing',
    partnerName: 'HubSpot',
    isLocked: false,
    eligibilityConditions: 'Startup with less than $2M funding.',
    discountInfo: '90% off first year',
  },
  {
    title: 'Mixpanel Analytics Pro',
    description: 'Product analytics to understand user behavior. Track funnels, retention, and engagement.',
    category: 'analytics',
    partnerName: 'Mixpanel',
    isLocked: false,
    eligibilityConditions: 'Early-stage company. No minimum revenue.',
    discountInfo: '50% off annual plan',
  },
  {
    title: 'Notion Team Plan',
    description: 'All-in-one workspace for docs, tasks, wikis. Keep your team aligned and productive.',
    category: 'productivity',
    partnerName: 'Notion',
    isLocked: false,
    eligibilityConditions: 'Startup or small team.',
    discountInfo: 'Free for small teams, discount for larger',
  },
  {
    title: 'Stripe Atlas + Credits',
    description: 'Incorporate your startup and get Stripe credits. Simplify payments and compliance.',
    category: 'other',
    partnerName: 'Stripe',
    isLocked: true,
    eligibilityConditions: 'Pre-revenue or early-stage. Application required.',
    discountInfo: 'Credits + waived fees',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perksphere');
  await Deal.deleteMany({});
  await Deal.insertMany(deals);
  console.log('Seeded', deals.length, 'deals');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
