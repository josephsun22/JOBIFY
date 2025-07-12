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

export const getGitCommitDate = (directory = process.cwd()) => {
  try {
    const date = execSync('git log -1 --format=%cd --date=iso', { 
      cwd: directory,
      encoding: 'utf8' 
    }).trim();
    return date;
  } catch (error) {
    console.error('Error getting git commit date:', error.message);
    return null;
  }
};

export const getGitInfo = () => {
  const frontendHash = getGitHash(path.join(__dirname, '../client'));
  const frontendCommitDate = getGitCommitDate(path.join(__dirname, '../client'));
  
  return {
    frontend: frontendHash,
    timestamp: frontendCommitDate || new Date().toISOString()
  };
}; 