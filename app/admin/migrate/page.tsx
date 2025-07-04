'use client';

import { useState } from 'react';

export default function MigratePage() {
  const [migrating, setMigrating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runMigration = async () => {
    setMigrating(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: 'migrate-categories-2024'
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ ${data.message}`);
      } else {
        setResult(`❌ ${data.error}: ${data.details || ''}`);
      }
    } catch (error) {
      setResult(`❌ Migration failed: ${error}`);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-secondary-900 mb-6">Category Migration</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Migrate Old Categories</h2>
        
        <div className="mb-6">
          <p className="text-secondary-600 mb-4">
            This will update existing paintings with old category values to match the new categories:
          </p>
          <ul className="list-disc list-inside text-sm text-secondary-600 space-y-1">
            <li><strong>landscape</strong> → <strong>tanjore-paintings</strong></li>
            <li><strong>portrait</strong> → <strong>portraits</strong></li>
            <li><strong>abstract</strong> → <strong>oil-paintings</strong></li>
            <li><strong>still-life</strong> → <strong>sketch-painting</strong></li>
            <li><strong>other</strong> → <strong>oil-paintings</strong></li>
          </ul>
        </div>
        
        <button
          onClick={runMigration}
          disabled={migrating}
          className="btn-primary"
        >
          {migrating ? 'Migrating...' : 'Run Migration'}
        </button>
        
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result.includes('✅') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
} 