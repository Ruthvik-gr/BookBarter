import { useState } from 'react';
import axiosInstance from "../../config/api";

const ReceivedRequestsTab = ({ requests, fetchRequests }) => {
  const [toast, setToast] = useState(null);

  const handleAcceptRequest = async (requestId) => {
    try {
      await axiosInstance.post(`/exchange-requests/${requestId}/accept`);
      fetchRequests();
      setToast({ type: 'success', message: 'Request accepted successfully.' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'Failed to accept request.' });
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axiosInstance.post(`/exchange-requests/${requestId}/decline`);
      fetchRequests();
      setToast({ type: 'success', message: 'Request rejected successfully.' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'Failed to reject request.' });
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Book</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offered Book</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.requester?.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {request.requestedBook?.title} by {request.requestedBook?.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.status !== "pending" ? (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAcceptRequest(request._id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectRequest(request._id)}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {request.offeredBook?.title} by {request.offeredBook?.author}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default ReceivedRequestsTab;