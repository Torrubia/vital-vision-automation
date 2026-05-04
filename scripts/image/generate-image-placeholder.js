/**
 * generate-image-placeholder.js
 * Vital Vision — Gemini Image API Safe Mode Generator
 *
 * SAFE MODE: Will NOT make a real API call unless RUN_IMAGE_GENERATION=true in .env.
 * Saves prompt record to assets/prompts/ on every run (for logging and cost tracking).
 * Saves generated image to assets/generated/ only when generation is enabled.
 *
 * Never auto-publishes. Never uploads to Meta or Shopify.
 * Never prints full API key.
 */

'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');

// ─── Safety Gate ─────────────────────────────────────────────────────────────

const RUN_GENERATION = process.env.RUN_IMAGE_GENERATION === 'true';
const AUTO_PUBLISH   = process.env.AUTO_PUBLISH;
const REQUIRE_APPROVAL = process.env.REQUIRE_HUMAN_APPROVAL;

console.log('');
console.log('=== Vital Vision — Image Generator (Safe Mode) ===');
console.log('');

// Hard block on auto-publish
if (AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true detected. This script will not run.');
  console.error('Set AUTO_PUBLISH=false in .env and try again.');
  process.exit(1);
}

if (REQUIRE_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false detected. This script will not run.');
  console.error('Set REQUIRE_HUMAN_APPROVAL=true in .env and try again.');
  process.exit(1);
}

// API key check — never print full key
const apiKey = process.env.GOOGLE_API_KEY;
const model  = process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image-preview';

if (!apiKey || apiKey.trim() === '') {
  console.error('MISSING: GOOGLE_API_KEY is not set in .env.');
  console.error('Add your Google API key to .env and run image:check first.');
  console.error('No API call was made. No image was generated.');
  process.exit(1);
}

const keyPreview = `${apiKey.substring(0, 6)}${'*'.repeat(Math.max(0, apiKey.length - 6))}`;
console.log(`API Key:  ${keyPreview} (truncated — full key never printed)`);
console.log(`Model:    ${model}`);
console.log(`Generate: ${RUN_GENERATION ? 'ENABLED' : 'DISABLED (safe mode)'}`);
console.log('');

// ─── Prompt Definition ───────────────────────────────────────────────────────

// Edit this prompt to match the desired image for the current post.
// Follow Vital Vision brand style: soft light, lifestyle, minimal, no clinical imagery.
const imagePrompt = {
  product: 'Inner Calm',
  style: 'Soft overhead flat lay. Inner Calm supplement bottle centered on warm linen surface. ' +
         'Small glass of water to the left. Folded journal to the right. One dried sprig nearby. ' +
         'Warm natural light from the left. Calm, intentional, minimal. ' +
         'Color palette: warm off-white, sage green, soft amber. No harsh shadows. No text in image.',
  platform: 'Instagram Feed',
  dimensions: '1080x1080',
  complianceCheck: 'No disease claims. No before/after. Lifestyle imagery only. No medical setting.',
};

// ─── Paths ───────────────────────────────────────────────────────────────────

const BASE    = path.resolve(__dirname, '../../');
const PROMPTS = path.join(BASE, 'assets', 'prompts');
const GENERATED = path.join(BASE, 'assets', 'generated');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const promptFile    = path.join(PROMPTS,   `${timestamp}-inner-calm-prompt.json`);
const placeholderFile = path.join(GENERATED, `${timestamp}-inner-calm-PLACEHOLDER.txt`);

// ─── Save Prompt Record ───────────────────────────────────────────────────────

const promptRecord = {
  timestamp,
  product: imagePrompt.product,
  platform: imagePrompt.platform,
  dimensions: imagePrompt.dimensions,
  prompt: imagePrompt.style,
  complianceCheck: imagePrompt.complianceCheck,
  generationEnabled: RUN_GENERATION,
  apiKeyUsed: keyPreview,
  model,
  autoPublish: false,
  requireHumanApproval: true,
  status: RUN_GENERATION ? 'generation_attempted' : 'placeholder_only',
};

fs.writeFileSync(promptFile, JSON.stringify(promptRecord, null, 2));
console.log(`Prompt record saved: assets/prompts/${path.basename(promptFile)}`);

// ─── Generation Gate ─────────────────────────────────────────────────────────

if (!RUN_GENERATION) {
  // Safe mode — save placeholder only, no API call
  const placeholderContent = [
    'VITAL VISION — IMAGE PLACEHOLDER',
    '==================================',
    '',
    `Product:    ${imagePrompt.product}`,
    `Platform:   ${imagePrompt.platform}`,
    `Dimensions: ${imagePrompt.dimensions}`,
    `Timestamp:  ${timestamp}`,
    '',
    'PROMPT:',
    imagePrompt.style,
    '',
    'STATUS: PLACEHOLDER ONLY — no image generated.',
    'To generate: set RUN_IMAGE_GENERATION=true in .env and re-run.',
    '',
    'SAFETY:',
    '  AUTO_PUBLISH=false',
    '  REQUIRE_HUMAN_APPROVAL=true',
    '  No API call was made.',
    '  No image was generated.',
    '  No image was uploaded or published.',
  ].join('\n');

  fs.writeFileSync(placeholderFile, placeholderContent);
  console.log(`Placeholder saved:   assets/generated/${path.basename(placeholderFile)}`);
  console.log('');
  console.log('SAFE MODE: No API call made. No image generated.');
  console.log('To enable generation, set RUN_IMAGE_GENERATION=true in .env.');
  console.log('Human approval required before any generated image is used.');
  process.exit(0);
}

// ─── Real Generation (only runs if RUN_IMAGE_GENERATION=true) ────────────────

console.log('');
console.log('RUN_IMAGE_GENERATION=true detected. Proceeding with API call...');
console.log('');

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function generateImage() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Model read from GEMINI_IMAGE_MODEL in .env — uses generateContent with responseModalities
    console.log(`Using model: ${model}`);
    const imageModel = genAI.getGenerativeModel({
      model,
      generationConfig: {
        responseModalities: ['image', 'text'],
      },
    });

    console.log('Sending prompt to Gemini Image API...');
    console.log(`Prompt: ${imagePrompt.style.substring(0, 80)}...`);
    console.log('');

    const result = await imageModel.generateContent(imagePrompt.style);
    const parts = result.response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith('image/'));

    if (!imagePart) {
      console.error('No image returned from API. No file saved.');
      console.error('Check your API quota and model availability.');
      process.exit(1);
    }

    // Save image to assets/generated/
    const ext = imagePart.inlineData.mimeType.split('/')[1] || 'png';
    const imageFile = path.join(GENERATED, `${timestamp}-inner-calm.${ext}`);
    const imageBytes = Buffer.from(imagePart.inlineData.data, 'base64');
    fs.writeFileSync(imageFile, imageBytes);

    // Update prompt record status
    promptRecord.status = 'generated';
    promptRecord.outputFile = `assets/generated/${path.basename(imageFile)}`;
    fs.writeFileSync(promptFile, JSON.stringify(promptRecord, null, 2));

    console.log(`Image saved:  assets/generated/${path.basename(imageFile)}`);
    console.log(`Prompt log:   assets/prompts/${path.basename(promptFile)}`);
    console.log('');
    console.log('IMPORTANT: Human approval required before this image is used in any post.');
    console.log('Use automations/approved/approval-checklist.md to review.');
    console.log('AUTO_PUBLISH=false — image will not be uploaded automatically.');

  } catch (err) {
    console.error('');
    console.error('API call failed:', err.message || err);
    console.error('');
    console.error('Common causes:');
    console.error('  - GOOGLE_API_KEY does not have Gemini Image API access');
    console.error(`  - ${model} not available in your region or plan`);
    console.error('  - Daily quota exceeded (limit: 10 images — see config/api-limits.json)');
    console.error('');
    console.error('No image was saved. No image was published.');
    process.exit(1);
  }
}

generateImage();
