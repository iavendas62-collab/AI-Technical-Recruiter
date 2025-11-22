#!/usr/bin/env node

/**
 * ===========================================
 * AI Tech Recruiter - Data Sanitization Script
 * ===========================================
 * 
 * This script removes sensitive data from files
 * before committing to public repositories.
 * 
 * Usage: node scripts/sanitize.js
 * 
 * ===========================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Log with colors
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}\n`)
};

// =====================================
// SENSITIVE DATA PATTERNS
// =====================================

const SENSITIVE_PATTERNS = {
  // Email addresses (real ones)
  emails: [
    /iavendas62@gmail\.com/gi,
    /pedro\.farias@[\w.-]+/gi,
    /[\w.-]+@(?!example\.com|test\.com|demo\.com)[\w.-]+\.[a-z]{2,}/gi
  ],
  
  // Telegram
  telegram: [
    /\b\d{10}:\w{35}\b/g, // Bot tokens
    /8578320748:AAH9AUs9FmoUQSOH53XJsDt6jKWBFuoBQAY/g,
    /8415226231:AAElz-5d4IwN73dyeg59IbuYAOZg5fVpidg/g,
    /8010413033/g // Chat ID
  ],
  
  // GitHub tokens
  github: [
    /ghp_[a-zA-Z0-9]{36}/g,
    /gho_[a-zA-Z0-9]{36}/g,
    /ghu_[a-zA-Z0-9]{36}/g,
    /ghs_[a-zA-Z0-9]{36}/g,
    /ghr_[a-zA-Z0-9]{36}/g
  ],
  
  // Google OAuth
  google: [
    /AIza[0-9A-Za-z_-]{35}/g,
    /[0-9]+-[a-z0-9]+\.apps\.googleusercontent\.com/g
  ],
  
  // IBM Cloud
  ibm: [
    /apikey-[a-zA-Z0-9-]+/g,
    /iam-[a-zA-Z0-9-]+/g
  ],
  
  // Generic API keys
  apiKeys: [
    /api[_-]?key[s]?["']?\s*[:=]\s*["']?([a-zA-Z0-9_-]{20,})/gi,
    /secret["']?\s*[:=]\s*["']?([a-zA-Z0-9_-]{20,})/gi,
    /token["']?\s*[:=]\s*["']?([a-zA-Z0-9_-]{20,})/gi,
    /password["']?\s*[:=]\s*["']?([a-zA-Z0-9_-]{8,})/gi
  ],
  
  // Webhook URLs with IDs
  webhooks: [
    /https?:\/\/[\w.-]+\/webhook\/[a-f0-9-]{36}/gi,
    /8e4c32fe-e68a-4ff0-8256-e13e78d6289a/g,
    /c3c47fb3-ecac-4b4d-be06-3f55f737778c/g,
    /b89c1605-d928-4654-88df-768de805dca8/g,
    /b89c1605-d928-4654-88df-768de805dca9/g
  ],
  
  // Phone numbers (Brazilian format)
  phones: [
    /\(\d{2}\)\s*9?\d{4}-\d{4}/g
  ],
  
  // IP Addresses (private ranges)
  ips: [
    /\b(?:10|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/g
  ]
};

// =====================================
// REPLACEMENT VALUES
// =====================================

const REPLACEMENTS = {
  email: '{{DEMO_EMAIL}}',
  telegram_token: '{{TELEGRAM_BOT_TOKEN}}',
  telegram_chat: '{{TELEGRAM_CHAT_ID}}',
  github_token: '{{GITHUB_API_TOKEN}}',
  google_client: '{{GOOGLE_CLIENT_ID}}',
  google_secret: '{{GOOGLE_CLIENT_SECRET}}',
  api_key: '{{API_KEY}}',
  secret: '{{SECRET}}',
  token: '{{TOKEN}}',
  password: '{{PASSWORD}}',
  webhook_url: '{{WEBHOOK_URL}}',
  webhook_id: '{{WEBHOOK_ID}}',
  phone: '{{PHONE_NUMBER}}',
  ip: '{{IP_ADDRESS}}'
};

// =====================================
// FILES TO SANITIZE
// =====================================

const FILES_TO_SANITIZE = [
  'workflows/IBM Watson.json',
  'README.md',
  'ARCHITECTURE.md',
  'API_REFERENCE.md',
  'DEPLOYMENT.md',
  'docs/*.md'
];

// =====================================
// SANITIZATION FUNCTIONS
// =====================================

/**
 * Sanitize a single file
 */
function sanitizeFile(filePath) {
  log.info(`Sanitizing: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    log.warning(`File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;
  
  // Apply all patterns
  Object.keys(SENSITIVE_PATTERNS).forEach(category => {
    SENSITIVE_PATTERNS[category].forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        const replacement = getReplacementFor(category);
        content = content.replace(pattern, replacement);
        changeCount += matches.length;
      }
    });
  });
  
  if (changeCount > 0) {
    // Create sanitized version
    const ext = path.extname(filePath);
    const sanitizedPath = filePath.replace(ext, `.sanitized${ext}`);
    
    fs.writeFileSync(sanitizedPath, content, 'utf8');
    log.success(`Created: ${sanitizedPath} (${changeCount} replacements)`);
    return true;
  } else {
    log.info(`No sensitive data found in: ${filePath}`);
    return false;
  }
}

/**
 * Get appropriate replacement for category
 */
function getReplacementFor(category) {
  const map = {
    emails: REPLACEMENTS.email,
    telegram: REPLACEMENTS.telegram_token,
    github: REPLACEMENTS.github_token,
    google: REPLACEMENTS.google_client,
    ibm: REPLACEMENTS.api_key,
    apiKeys: REPLACEMENTS.api_key,
    webhooks: REPLACEMENTS.webhook_url,
    phones: REPLACEMENTS.phone,
    ips: REPLACEMENTS.ip
  };
  
  return map[category] || REPLACEMENTS.token;
}

/**
 * Sanitize workflow JSON with special handling
 */
function sanitizeWorkflowJSON(filePath) {
  log.info(`Sanitizing workflow: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    log.warning(`Workflow not found: ${filePath}`);
    return false;
  }
  
  const workflow = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changeCount = 0;
  
  // Recursive function to sanitize JSON
  function sanitizeObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        const original = obj[key];
        
        // Apply all patterns
        Object.values(SENSITIVE_PATTERNS).flat().forEach(pattern => {
          obj[key] = obj[key].replace(pattern, '{{SANITIZED}}');
        });
        
        if (original !== obj[key]) {
          changeCount++;
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
  
  sanitizeObject(workflow);
  
  if (changeCount > 0) {
    const sanitizedPath = filePath.replace('.json', '.sanitized.json');
    fs.writeFileSync(sanitizedPath, JSON.stringify(workflow, null, 2), 'utf8');
    log.success(`Created: ${sanitizedPath} (${changeCount} replacements)`);
    return true;
  }
  
  return false;
}

/**
 * Scan for remaining sensitive data
 */
function scanForSecrets(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];
  
  Object.keys(SENSITIVE_PATTERNS).forEach(category => {
    SENSITIVE_PATTERNS[category].forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        findings.push({
          category,
          matches: matches.length,
          sample: matches[0].substring(0, 20) + '...'
        });
      }
    });
  });
  
  return findings;
}

/**
 * Generate sanitization report
 */
function generateReport(results) {
  log.title('SANITIZATION REPORT');
  
  const sanitized = results.filter(r => r.sanitized);
  const skipped = results.filter(r => !r.sanitized);
  
  log.success(`Sanitized: ${sanitized.length} files`);
  log.info(`Skipped: ${skipped.length} files`);
  
  if (sanitized.length > 0) {
    console.log('\nSanitized files:');
    sanitized.forEach(r => {
      console.log(`  • ${r.file}`);
    });
  }
  
  if (skipped.length > 0) {
    console.log('\nSkipped files (no sensitive data):');
    skipped.forEach(r => {
      console.log(`  • ${r.file}`);
    });
  }
}

/**
 * Verify sanitization
 */
function verifySanitization(filePath) {
  const findings = scanForSecrets(filePath);
  
  if (findings.length > 0) {
    log.error(`⚠️  WARNING: ${filePath} still contains sensitive data!`);
    findings.forEach(f => {
      log.warning(`  ${f.category}: ${f.matches} occurrences (e.g., ${f.sample})`);
    });
    return false;
  }
  
  return true;
}

// =====================================
// MAIN EXECUTION
// =====================================

function main() {
  log.title('🔒 AI TECH RECRUITER - DATA SANITIZATION');
  
  console.log('This script will remove sensitive data from your files.');
  console.log('Sanitized versions will be created with .sanitized extension.\n');
  
  const results = [];
  
  // Sanitize workflow JSON
  const workflowPath = 'workflows/IBM Watson.json';
  if (fs.existsSync(workflowPath)) {
    const sanitized = sanitizeWorkflowJSON(workflowPath);
    results.push({ file: workflowPath, sanitized });
  }
  
  // Sanitize other files
  FILES_TO_SANITIZE.forEach(pattern => {
    if (pattern.includes('*')) {
      // Handle glob patterns (simplified)
      const dir = path.dirname(pattern);
      const ext = path.extname(pattern);
      
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
          if (file.endsWith(ext)) {
            const filePath = path.join(dir, file);
            const sanitized = sanitizeFile(filePath);
            results.push({ file: filePath, sanitized });
          }
        });
      }
    } else {
      if (fs.existsSync(pattern) && pattern !== workflowPath) {
        const sanitized = sanitizeFile(pattern);
        results.push({ file: pattern, sanitized });
      }
    }
  });
  
  // Generate report
  generateReport(results);
  
  // Verify sanitized files
  log.title('VERIFICATION');
  
  let allClean = true;
  results.filter(r => r.sanitized).forEach(r => {
    const sanitizedPath = r.file.replace(
      path.extname(r.file),
      `.sanitized${path.extname(r.file)}`
    );
    
    if (!verifySanitization(sanitizedPath)) {
      allClean = false;
    }
  });
  
  // Final message
  console.log();
  if (allClean) {
    log.success('✅ All files sanitized successfully!');
    log.info('You can now safely commit the .sanitized files.');
  } else {
    log.error('❌ Some files still contain sensitive data!');
    log.warning('Please review the warnings above before committing.');
  }
  
  console.log();
  log.info('Next steps:');
  console.log('  1. Review the .sanitized files');
  console.log('  2. Delete or move original files with sensitive data');
  console.log('  3. Rename .sanitized files to remove the suffix');
  console.log('  4. Commit to repository');
}

// Run script
if (require.main === module) {
  try {
    main();
  } catch (error) {
    log.error(`Fatal error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  sanitizeFile,
  sanitizeWorkflowJSON,
  scanForSecrets
};