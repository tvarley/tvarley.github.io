import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get package.json version
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
const baseVersion = packageJson.version;

// Get Git information
const getGitInfo = () => {
  try {
    // Get commit hash
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();

    // Get run number from GitHub Actions (fallback to timestamp if not available)
    const runNumber = process.env.GITHUB_RUN_NUMBER || Math.floor(Date.now() / 1000).toString();

    // Get build date
    const buildDate = new Date().toISOString();

    return {
      commitHash,
      runNumber,
      buildDate
    };
  } catch (error) {
    console.warn('Could not get Git info:', error.message);
    // Fallback values
    return {
      commitHash: 'unknown',
      runNumber: '0',
      buildDate: new Date().toISOString()
    };
  }
};

const gitInfo = getGitInfo();

// Create build info object
const buildInfo = {
  version: `${baseVersion}-build${gitInfo.runNumber}`,
  baseVersion,
  buildNumber: gitInfo.runNumber,
  commitHash: gitInfo.commitHash,
  buildDate: gitInfo.buildDate,
  commitUrl: `https://github.com/tvarley/tvarley.github.io/commit/${gitInfo.commitHash}`
};

// Write to src/build-info.json
const outputPath = path.join(__dirname, '../src/build-info.json');
fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2));

console.log(`Build info generated: ${buildInfo.version} (${gitInfo.commitHash})`);