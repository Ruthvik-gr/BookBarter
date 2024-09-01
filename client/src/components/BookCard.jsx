import { useState } from 'react';
import axiosInstance from "../config/api";
import ExchangeModel from "./Modals/ExchangeModel";

const BookCard = ({ book, onDelete, onEdit, userBooks = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleExchangeRequest = async (requestedBookId, offeredBookId) => {
    setIsRequesting(true);
    try {
      await axiosInstance.post("/exchange-requests", {
        requestedBookId,
        offeredBookId,
      });
      console.log("Exchange request sent successfully");
    } catch (error) {
      console.error("Failed to send exchange request:", error);
    } finally {
      setIsRequesting(false);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {book.imageLink && book.imageLink.trim() !== '' ? (
        <img
          src={book.imageLink}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2 truncate">{book.title}</h3>
        <p className="text-sm text-black-600 mb-2">By :  {book.author}</p>
        <p className="text-sm text-black-600 mb-2">Genre: {book.genre}</p>
        <p className="text-sm text-black-700 mb-4 line-clamp-3">{book.description}</p>
        {userBooks ? (
          <div className="flex justify-between">
            <button
              onClick={() => onEdit(book)}
              className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-400 transition-colors duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book._id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={onOpen}
            className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
            disabled={isRequesting}
          >
            {isRequesting ? 'Requesting...' : 'Request Exchange'}
          </button>
        )}
      </div>
      <ExchangeModel
        isOpen={isOpen}
        onClose={onClose}
        book={book}
        onExchange={handleExchangeRequest}
      />
    </div>
  );
};

export default BookCard;
