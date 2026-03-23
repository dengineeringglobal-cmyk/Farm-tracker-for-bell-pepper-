'use client';

import { useState, useEffect } from 'react';
import { Download, Upload, Cloud, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface FarmData {
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  cropHealth: string;
  notes: string;
}

export default function DataManagementPage() {
  const [farmData, setFarmData] = useState<FarmData[]>([]);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);

    // Load farm data from localStorage
    const savedData = localStorage.getItem('farmData');
    if (savedData) {
      setFarmData(JSON.parse(savedData));
    }

    // Check cloud sync status
    const syncStatus = localStorage.getItem('cloudSyncStatus');
    if (syncStatus) {
      const { synced, timestamp } = JSON.parse(syncStatus);
      setCloudSynced(synced);
      setLastSyncTime(timestamp);
    }
  }, []);

  const handleAddData = () => {
    const newEntry: FarmData = {
      date: new Date().toISOString().split('T')[0],
      temperature: 25,
      humidity: 60,
      windSpeed: 10,
      cropHealth: 'Good',
      notes: 'Sample entry',
    };

    const updatedData = [...farmData, newEntry];
    setFarmData(updatedData);
    localStorage.setItem('farmData', JSON.stringify(updatedData));
    setMessage('Data entry added successfully!');
  };

  const handleExportExcel = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/export-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: farmData }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `farm-data-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage('Data exported successfully!');
    } catch (error) {
      console.error('[v0] Export error:', error);
      setMessage('Export failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloudSync = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cloud-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: farmData,
          userId: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').email : 'unknown',
        }),
      });

      if (!response.ok) throw new Error('Cloud sync failed');

      const timestamp = new Date().toLocaleString();
      setCloudSynced(true);
      setLastSyncTime(timestamp);
      localStorage.setItem('cloudSyncStatus', JSON.stringify({ synced: true, timestamp }));

      setMessage('Data synced to cloud successfully!');
    } catch (error) {
      console.error('[v0] Cloud sync error:', error);
      setMessage('Cloud sync failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearMessage = () => {
    setTimeout(() => setMessage(''), 3000);
  };

  useEffect(() => {
    if (message) {
      handleClearMessage();
    }
  }, [message]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access data management</p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Data Management</h1>
          <p className="text-gray-600">Manage your farm data with local and cloud storage options</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex gap-3 ${message.includes('failed') ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            {message.includes('failed') ? (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            )}
            <p className={message.includes('failed') ? 'text-red-800' : 'text-green-800'}>{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Local Storage Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Local Storage</h2>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Your farm data is automatically saved locally on this device. You can export it as an Excel file.
            </p>

            <div className="bg-gray-50 rounded p-4 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Stored entries:</strong> {farmData.length}
              </p>
              {farmData.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  Last entry: {farmData[farmData.length - 1].date}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={handleAddData}
                className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
              >
                Add Sample Data
              </button>
              <button
                onClick={handleExportExcel}
                disabled={loading || farmData.length === 0}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                <Download className="w-4 h-4" />
                Export to Excel
              </button>
            </div>
          </div>

          {/* Cloud Storage Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Cloud Storage</h2>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Sync your farm data to the cloud for backup and access from other devices.
            </p>

            <div className="bg-gray-50 rounded p-4 mb-4">
              {cloudSynced ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-700 font-medium">Synced</p>
                    <p className="text-xs text-gray-600">Last sync: {lastSyncTime}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700">Not synced yet</p>
              )}
            </div>

            <button
              onClick={handleCloudSync}
              disabled={loading || farmData.length === 0}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              <Upload className="w-4 h-4" />
              Sync to Cloud
            </button>

            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200 text-xs text-blue-800">
              <p className="font-medium mb-1">Note:</p>
              <p>Cloud sync requires a backend server. Contact support to set up cloud storage.</p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        {farmData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-gray-800">Recent Data Entries</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Temperature</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Humidity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Wind Speed</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Crop Health</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {farmData.map((entry, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-800">{entry.date}</td>
                      <td className="px-6 py-3 text-sm text-gray-800">{entry.temperature}°C</td>
                      <td className="px-6 py-3 text-sm text-gray-800">{entry.humidity}%</td>
                      <td className="px-6 py-3 text-sm text-gray-800">{entry.windSpeed} km/h</td>
                      <td className="px-6 py-3 text-sm text-gray-800">{entry.cropHealth}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{entry.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
