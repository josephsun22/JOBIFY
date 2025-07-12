import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getGitHash = (directory = process.cwd()) => {
  try {
    const hash = execSync('git rev-parse --short HEAD', { 
      cwd: directory,
      encoding: 'utf8' 
    }).trim();
    return hash;
  } catch (error) {
    console.error('Error getting git hash:', error.message);
    return 'unknown';
  }
};

export const getGitInfo = () => {
  const backendHash = getGitHash();
  const frontendHash = getGitHash(path.join(__dirname, '../client'));
  
  return {
    backend: backendHash,
    frontend: frontendHash,
    timestamp: new Date().toISOString()
  };
}; 