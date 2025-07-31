// set-env.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const devKey = process.env.NG_APP_GOOGLE_CALENDAR_API_KEY;

if (!devKey) {
  console.error('Error: NG_APP_GOOGLE_CALENDAR_API_KEY is not defined in the .env file.');
  process.exit(1);
}

// Path to the environment file template
const envTemplatePath = path.resolve(__dirname, 'src/environments/environment.ts');
let envContent = fs.readFileSync(envTemplatePath, 'utf8');

// Replace the placeholder with the actual API key
envContent = envContent.replace('\'{{GOOGLE_CALENDAR_DEV_API_KEY}}\'', `'${devKey}'`);

// Write the updated content back to the environment file
fs.writeFileSync(envTemplatePath, envContent);

console.log('Successfully set environment variables for local development.', devKey);