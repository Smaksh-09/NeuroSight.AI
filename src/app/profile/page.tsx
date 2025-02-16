'use client';
import { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

interface HistoryItem {
  id: string;
  type: string;
  result: string;
  createdAt: string;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/user/history');
      const data = await response.json();
      
      // Check if data and history exist before accessing
      if (data && data.history) {
        setHistory(data.history.slice(0, 3)); // Get last 3 items
      } else {
        setHistory([]); // Set empty array if no history
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (id: string) => {
    try {
      const response = await fetch(`/api/user/history/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete history item');
      }
      
      fetchHistory(); // Refresh history after deletion
    } catch (error) {
      console.error('Failed to delete history item:', error);
      setError('Failed to delete history item');
    }
  };

  const maskEmail = (email: string) => {
    if (!email) return '';
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
    if (!result) return '';
    
    try {
      // For brain, skin, and lung results, show the first line as it contains the summary
      if (['brain', 'skin', 'lung'].includes(type.toLowerCase())) {
        return result.split('\n')[0];
      }
      // For medical reports, show the first key finding
      if (type.toLowerCase() === 'report') {
        const keyFindings = result.split('Key Findings:');
        return keyFindings.length > 1 ? keyFindings[1].split('\n')[1]?.trim() : result;
      }
      return result;
    } catch (e) {
      return result;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        {/* User Info Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-blue-500/80 backdrop-blur-sm flex items-center justify-center text-3xl text-white font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
                <p className="text-blue-100">{user?.email && maskEmail(user.email)}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500/80 text-white rounded-lg 
                hover:bg-red-600/90 transition-colors backdrop-blur-sm border border-red-400/30"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Analysis History</h2>
          
          {loading ? (
            <div className="text-blue-100 text-center py-4">Loading history...</div>
          ) : error ? (
            <div className="text-red-400 text-center py-4">{error}</div>
          ) : history.length === 0 ? (
            <div className="text-blue-100 text-center py-4">No analysis history found</div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{getAnalysisTypeIcon(item.type)}</span>
                        <span className="text-white font-semibold capitalize">
                          {item.type} Analysis
                        </span>
                      </div>
                      <p className="text-blue-100">{formatResult(item.result, item.type)}</p>
                      <p className="text-sm text-blue-200 mt-2">{formatDate(item.createdAt)}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteHistory(item.id)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}