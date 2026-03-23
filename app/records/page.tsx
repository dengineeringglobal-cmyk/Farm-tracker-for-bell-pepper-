'use client';

import React, { useState, useEffect } from 'react';
import { FarmRecord, getFarmRecords, deleteFarmRecord, calculateFarmStats, getCloudSyncStatus, updateCloudSyncStatus } from '@/lib/farm-data';
import FarmRecordForm from '@/components/farm-record-form';
import { Plus, Download, Cloud, Trash2, Edit2, Eye, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FarmRecordsPage() {
  const router = useRouter();
  const [records, setRecords] = useState<FarmRecord[]>([]);
  const [stats, setStats] = useState(calculateFarmStats());
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<any>(null);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login?redirect=/records');
      return;
    }
    setIsLoggedIn(true);
    loadRecords();
    loadSyncStatus();
  }, [router]);

  const loadRecords = () => {
    const farmRecords = getFarmRecords();
    setRecords(farmRecords);
    setStats(calculateFarmStats());
  };

  const loadSyncStatus = () => {
    const status = getCloudSyncStatus();
    setCloudSyncStatus(status);
  };

  const handleSaveRecord = (record: FarmRecord) => {
    loadRecords();
    setShowForm(false);
    setMessage('Record saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      deleteFarmRecord(id);
      loadRecords();
      setMessage('Record deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleExportCSV = () => {
    if (records.length === 0) {
      setMessage('No records to export');
      return;
    }

    const headers = [
      'Date', 'Temperature (°C)', 'Humidity (%)', 'Wind Speed (km/h)', 'Rainfall (mm)',
      'Soil Moisture (%)', 'Plant Height (cm)', 'Leaf Condition', 'Disease', 'Pest',
      'Fertilized', 'Watered', 'Yield Estimate (kg)', 'Notes'
    ];

    const rows = records.map(r => [
      r.date,
      r.temperature,
      r.humidity,
      r.windSpeed,
      r.rainfall,
      r.soilMoisture,
      r.plantHeight,
      r.leafCondition,
      r.diseaseObserved,
      r.pestObserved,
      r.fertilizationApplied ? 'Yes' : 'No',
      r.wateringDone ? 'Yes' : 'No',
      r.yieldEstimate || 0,
      r.notes
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farm-records-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setMessage('Records exported successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCloudSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/cloud-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: records,
          userId: localStorage.getItem('user') || 'anonymous'
        })
      });

      if (response.ok) {
        const result = await response.json();
        updateCloudSyncStatus({
          synced: true,
          timestamp: new Date().toISOString(),
          entriesCount: records.length
        });
        loadSyncStatus();
        setMessage(`Synced ${records.length} records to cloud!`);
      } else {
        setMessage('Failed to sync to cloud');
      }
    } catch (error) {
      setMessage('Error syncing to cloud');
      console.error('[v0] Cloud sync error:', error);
    } finally {
      setSyncing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Farm Records</h1>
          <p className="text-gray-600">Track and manage your bell pepper farm data</p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-medium">Total Records</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalRecords}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-medium">Avg Temperature</p>
            <p className="text-3xl font-bold text-orange-500">{stats.averageTemp}°C</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-medium">Avg Humidity</p>
            <p className="text-3xl font-bold text-blue-500">{stats.averageHumidity}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-medium">Health Score</p>
            <p className="text-3xl font-bold text-green-600">{stats.plantHealthScore}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm font-medium">Last Record</p>
            <p className="text-lg font-semibold text-gray-800">{stats.lastRecordDate}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Record
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Download className="w-5 h-5" />
            Export to CSV
          </button>
          <button
            onClick={handleCloudSync}
            disabled={syncing}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium disabled:opacity-50"
          >
            <Cloud className="w-5 h-5" />
            {syncing ? 'Syncing...' : 'Sync to Cloud'}
          </button>
        </div>

        {/* Cloud Sync Status */}
        {cloudSyncStatus && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Cloud Sync Status</h3>
            </div>
            <p className="text-purple-800 text-sm">
              Last synced: {new Date(cloudSyncStatus.timestamp).toLocaleString()} - {cloudSyncStatus.entriesCount} entries
            </p>
          </div>
        )}

        {/* Records Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {records.length === 0 ? (
            <div className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No records yet. Add your first farm record to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Temp</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Humidity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Health</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Disease</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pest</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, idx) => (
                    <tr key={record.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.temperature}°C</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.humidity}%</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.leafCondition === 'excellent' ? 'bg-green-100 text-green-800' :
                          record.leafCondition === 'good' ? 'bg-blue-100 text-blue-800' :
                          record.leafCondition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {record.leafCondition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.diseaseObserved || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{record.pestObserved || '-'}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => handleDeleteRecord(record.id)}
                          className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <FarmRecordForm
          onSave={handleSaveRecord}
          onCancel={() => setShowForm(false)}
        />
      )}
    </main>
  );
}
