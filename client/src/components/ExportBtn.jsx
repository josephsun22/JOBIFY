import { useState } from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const ExportBtn = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Send user info in the POST body
      const response = await customFetch.post('/jobs/export-all');

      const { jobId, message } = response.data;
      toast.success(`${message} Job ID: ${jobId}`, {
        autoClose: 5000,
        position: "top-center",
      });
      toast.info('Your export is being processed in the background. You will be notified when it\'s ready.', {
        autoClose: 8000,
        position: "top-center",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error(error?.response?.data?.error || 'Error requesting export');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type='button'
      className='btn btn-hipster'
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? 'Queuing Export...' : 'Export All Jobs'}
    </button>
  );
};

export default ExportBtn; 