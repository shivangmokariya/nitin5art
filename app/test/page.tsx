'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settingTest, setSettingTest] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/settings/artist-image');
      const data = await response.json();
      console.log('API Response:', data);
      setApiData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const setTestImage = async () => {
    setSettingTest(true);
    try {
      const response = await fetch('/api/test/set-artist-image', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Set test image response:', data);
      
      // Refresh the data
      await fetchData();
    } catch (error) {
      console.error('Error setting test image:', error);
    } finally {
      setSettingTest(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="mb-6">
        <button
          onClick={setTestImage}
          disabled={settingTest}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {settingTest ? 'Setting Test Image...' : 'Set Test Artist Image'}
        </button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">API Data:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(apiData, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test Images:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">API Image:</h3>
            {apiData?.artistImageUrl && (
              <img
                src={apiData.artistImageUrl}
                alt="API Image"
                className="w-full h-48 object-cover rounded border"
                onError={(e) => console.error('API Image failed:', e)}
                onLoad={() => console.log('API Image loaded successfully')}
              />
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Test with existing image:</h3>
            <img
              src="/uploads/1751200282162-download.jpg"
              alt="Test Image"
              className="w-full h-48 object-cover rounded border"
              onError={(e) => console.error('Test Image failed:', e)}
              onLoad={() => console.log('Test Image loaded successfully')}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Direct Image Test:</h2>
        <p className="text-sm text-gray-600 mb-2">
          Try accessing these URLs directly in your browser:
        </p>
        <ul className="space-y-1 text-sm">
          <li>
            <a 
              href={apiData?.artistImageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {apiData?.artistImageUrl || 'No image URL'}
            </a>
          </li>
          <li>
            <a 
              href="/uploads/1751200282162-download.jpg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              /uploads/1751200282162-download.jpg
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
} 