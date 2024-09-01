import { useEffect, useState } from "react";
import axiosInstance from "../../config/api";
import SentRequestsTab from "./SentRequestsTab";
import ReceivedRequestsTab from "./ReceivedRequestsTab";

const ExchangeRequests = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSentRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/exchange-requests/sent");
      setSentRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast("Error", "Failed to fetch sent requests.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/exchange-requests");
      setReceivedRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast("Error", "Failed to fetch received requests.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (index === 0) {
      fetchSentRequests();
    } else if (index === 1) {
      fetchReceivedRequests();
    }
  };

  const showToast = (title, message, type) => {
    console.log(`${type.toUpperCase()}: ${title} - ${message}`);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Exchange Requests
        </h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex bg-gray-100">
            {["Sent Requests", "Received Requests"].map((tab, index) => (
              <button
                key={tab}
                className={`flex-1 py-4 px-6 text-sm sm:text-base font-semibold focus:outline-none transition-all duration-300 ${
                  activeTab === index
                    ? "text-blue-600 bg-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            ) : (
              <div className="w-full">
                {activeTab === 0 ? (
                  <SentRequestsTab requests={sentRequests} />
                ) : (
                  <ReceivedRequestsTab
                    requests={receivedRequests}
                    fetchRequests={fetchReceivedRequests}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRequests;
