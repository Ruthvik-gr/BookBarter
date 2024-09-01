import { useState, useEffect } from "react";
import axiosInstance from "../../config/api";

const ExchangeModel = ({ isOpen, onClose, book, onExchange }) => {
  const [userBooks, setUserBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [toast, setToast] = useState(null);

  const fetchUserBooks = async () => {
    try {
      const response = await axiosInstance.get("/books/user");
      setUserBooks(response.data.books || []);
    } catch (error) {
      console.error("Failed to fetch user books:", error);
      setToast({ type: "error", message: "Failed to fetch user books." });
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      fetchUserBooks();
    }
  }, [isOpen]);

  const handleExchange = async () => {
    if (!selectedBook) {
      setToast({ type: "error", message: "Please select a book to exchange." });
      return;
    }

    try {
      await onExchange(book._id, selectedBook);
      setToast({ type: "success", message: "Exchange request sent successfully." });
      onClose();
    } catch (error) {
      console.error("Failed to send exchange request:", error);
      setToast({ type: "error", message: "Failed to send exchange request." });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Exchange Request
                </h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{book.title}</p>
                  <p className="text-lg">by {book.author}</p>
                  <p className="text-sm mt-2">Genre: {book.genre}</p>
                  <div className="mt-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm">{book.description}</p>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 mt-2">
                    Owner: {book?.owner?.username}
                  </p>
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a book to exchange</option>
                    {userBooks.map((userBook) => (
                      <option key={userBook._id} value={userBook._id}>
                        {userBook.title} - {userBook?.author}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleExchange}
              disabled={!selectedBook}
            >
              Send Request
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
          toast.type === "error" ? "bg-red-500" : "bg-green-500"
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default ExchangeModel;