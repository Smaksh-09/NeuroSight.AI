'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaHistory, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import NavBar from '../components/NavBar';

interface HistoryItem {
  _id: string;
  type: string;
  result: string;
  createdAt: string;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/user/history');
      const data = await response.json();
      setHistory(data.history.slice(0, 3)); // Get last 3 items
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    try {
      await fetch(`/api/user/history/${id}`, {
        method: 'DELETE',
      });
      fetchHistory(); // Refresh history after deletion
    } catch (error) {
      console.error('Failed to delete history item:', error);
    }
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    return `${username[0]}${username[1]}***@${domain}`;
  };

  const getAnalysisTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'brain':
        return '🧠';
      case 'lung':
        return '🫁';
      case 'skin':
        return '🔬';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatResult = (result: string, type: string) => {
    try {
      // For brain, skin, and lung results, show the first line as it contains the summary
      if (['brain', 'skin', 'lung'].includes(type)) {
        return result.split('\n')[0];
      }
      // For medical reports, show the first key finding
      if (type === 'report') {
        return result.split('Key Findings:')[1]?.split('\n')[1] || result;
      }
      return result;
    } catch (e) {
      return result;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        {/* User Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl text-white font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
                <p className="text-gray-600">{user?.email && maskEmail(user.email)}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaHistory className="mr-2 text-blue-500" />
              Recent Activity
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No analysis history yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Your recent analyses will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg p-6 mb-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {item.type} Analysis
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteHistory(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <p className="text-gray-700">
                    {formatResult(item.result, item.type)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Analyses</h3>
            <p className="text-3xl font-bold text-blue-500">{history.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Member Since</h3>
            <p className="text-3xl font-bold text-blue-500">
              {formatDate(user?.createdAt || new Date().toISOString())}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Status</h3>
            <p className="text-3xl font-bold text-green-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}