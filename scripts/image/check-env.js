/**
 * check-env.js
 * Vital Vision — Gemini Image API Environment Check
 *
 * Verifies required environment variables exist before any image generation.
 * Does NOT make any API calls.
 * Does NOT print full API key values.
 * Does NOT generate images.
 */

'use strict';

require('dotenv').config();

const REQUIRED_VARS = [
  'GOOGLE_API_KEY',
  'GEMINI_IMAGE_MODEL',
];

const SAFETY_VARS = [
  'AUTO_PUBLISH',
  'REQUIRE_HUMAN_APPROVAL',
];

let allPassed = true;

console.log('');
console.log('=== Vital Vision — Environment Check ===');
console.log('Checking required variables for Gemini Image API...');
console.log('');

// Check required vars
REQUIRED_VARS.forEach((varName) => {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    console.error(`  MISSING: ${varName} is not set in .env`);
    allPassed = false;
  } else {
    // Only print first 6 chars — never print full key
    const preview = varName.includes('KEY')
      ? `${value.substring(0, 6)}${'*'.repeat(Math.max(0, value.length - 6))}`
      : value;
    console.log(`  OK: ${varName} = ${preview}`);
  }
});

console.log('');
console.log('Checking safety flags...');
console.log('');

// Check safety vars
SAFETY_VARS.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.warn(`  WARNING: ${varName} is not set — defaulting to safe value`);
  } else {
    console.log(`  OK: ${varName} = ${value}`);
  }
});

// Enforce safety flags
const autoPublish = process.env.AUTO_PUBLISH;
const requireApproval = process.env.REQUIRE_HUMAN_APPROVAL;

console.log('');
console.log('Enforcing safety rules...');
console.log('');

if (autoPublish === 'true') {
  console.error('  BLOCKED: AUTO_PUBLISH=true is not allowed. Set to false in .env.');
  allPassed = false;
} else {
  console.log('  OK: AUTO_PUBLISH is false — safe');
}

if (requireApproval === 'false') {
  console.error('  BLOCKED: REQUIRE_HUMAN_APPROVAL=false is not allowed. Set to true in .env.');
  allPassed = false;
} else {
  console.log('  OK: REQUIRE_HUMAN_APPROVAL is true — safe');
}

console.log('');

if (!allPassed) {
  console.error('=== CHECK FAILED — Fix the issues above before proceeding. ===');
  console.error('No API calls were made. No images were generated.');
  process.exit(1);
} else {
  console.log('=== CHECK PASSED — Environment is ready. ===');
  console.log('No API calls were made. No images were generated.');
  console.log('Run image:generate:test only when RUN_IMAGE_GENERATION=true is set.');
}

console.log('');
