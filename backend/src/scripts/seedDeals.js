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
  {
    title: 'GitHub Enterprise Cloud',
    description: 'Professional development platform for collaboration, automation, and security. Unlimited public and private repositories.',
    category: 'productivity',
    partnerName: 'GitHub',
    isLocked: false,
    eligibilityConditions: 'Startup or small team with fewer than 20 people.',
    discountInfo: 'Free for startups enrolled in GitHub Accelerator',
  },
  {
    title: 'Datadog Monitoring & Analytics',
    description: 'Full-stack monitoring, observability, and analytics platform. Monitor applications, infrastructure, and logs in real-time.',
    category: 'analytics',
    partnerName: 'Datadog',
    isLocked: true,
    eligibilityConditions: 'Verified startup. Must be less than 5 years old.',
    discountInfo: '50% off for 24 months',
  },
  {
    title: 'Figma Design Suite',
    description: 'Collaborative design and prototyping tool. Design, prototype, and hand off to development—all in one platform.',
    category: 'productivity',
    partnerName: 'Figma',
    isLocked: false,
    eligibilityConditions: 'Early-stage companies and design teams.',
    discountInfo: 'Free team plan + 50% discount on paid plans',
  },
  {
    title: 'Slack Workspace',
    description: 'Team communication and collaboration platform. Organize conversations, reduce email, and keep everyone connected.',
    category: 'productivity',
    partnerName: 'Slack',
    isLocked: false,
    eligibilityConditions: 'All startups welcome.',
    discountInfo: 'Free plan with premium features',
  },
  {
    title: 'Intercom Customer Communication',
    description: 'Customer communication platform with live chat, bots, and targeted messaging. Boost customer engagement and support.',
    category: 'marketing',
    partnerName: 'Intercom',
    isLocked: true,
    eligibilityConditions: 'Startup with less than $5M funding.',
    discountInfo: '60% off annual subscription',
  },
  {
    title: 'Amplitude Product Analytics',
    description: 'Advanced product analytics for understanding user behavior. Cohorts, funnels, and impact analysis at your fingertips.',
    category: 'analytics',
    partnerName: 'Amplitude',
    isLocked: false,
    eligibilityConditions: 'Early-stage startup or bootstrapped company.',
    discountInfo: 'Free tier + 40% discount on pro plan',
  },
  {
    title: 'Azure for Startups',
    description: 'Microsoft Azure cloud platform with free credits for startups. Build, deploy, and scale with enterprise-grade infrastructure.',
    category: 'cloud',
    partnerName: 'Microsoft Azure',
    isLocked: false,
    eligibilityConditions: 'Registered startup less than 3 years old.',
    discountInfo: '$150,000 in free credits',
  },
  {
    title: 'Mailchimp Email Marketing',
    description: 'Email marketing and automation platform. Create, send, and track email campaigns with powerful segmentation and automation.',
    category: 'marketing',
    partnerName: 'Mailchimp',
    isLocked: false,
    eligibilityConditions: 'Any startup or small business.',
    discountInfo: '50% off first 12 months',
  },
  {
    title: 'Zendesk Customer Support',
    description: 'Customer support and helpdesk software. Manage support tickets, live chat, and knowledge base in one platform.',
    category: 'marketing',
    partnerName: 'Zendesk',
    isLocked: true,
    eligibilityConditions: 'YC-backed or verified early-stage startup.',
    discountInfo: '65% off first year + free implementation',
  },
  {
    title: 'Linear Issue Tracking',
    description: 'Fast, modern issue tracking for software teams. Manage bugs, features, and priorities with beautiful interface and shortcuts.',
    category: 'productivity',
    partnerName: 'Linear',
    isLocked: false,
    eligibilityConditions: 'Startup teams using modern development practices.',
    discountInfo: 'Pro plan free for first 6 months',
  },
  {
    title: 'Supabase Open Source Backend',
    description: 'Open-source Firebase alternative. PostgreSQL database, authentication, and real-time subscriptions. Easy to self-host or use cloud.',
    category: 'cloud',
    partnerName: 'Supabase',
    isLocked: false,
    eligibilityConditions: 'All developers and startups.',
    discountInfo: 'Free tier + $150 monthly credits',
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
