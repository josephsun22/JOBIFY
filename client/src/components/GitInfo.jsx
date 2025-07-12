import { useState, useEffect } from 'react';

const GitInfo = () => {
  const [gitInfo, setGitInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitInfo = async () => {
      try {
        const response = await fetch('/api/v1/git-info');
        if (!response.ok) {
          throw new Error('Failed to fetch git information');
        }
        const data = await response.json();
        setGitInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitInfo();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <small>Loading git info...</small>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <small style={{ color: 'red' }}>Failed to load git info</small>
      </div>
    );
  }

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '0.5rem', 
      fontSize: '0.75rem',
      color: 'var(--text-secondary-color)',
      borderTop: '1px solid var(--grey-300)',
      marginTop: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span>
          <strong>Version:</strong> {gitInfo?.frontend || 'unknown'}
        </span>
        <span>
          <strong>Date:</strong> {gitInfo?.timestamp ? new Date(gitInfo.timestamp).toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          }) : 'unknown'}
        </span>
      </div>
    </div>
  );
};

export default GitInfo; 