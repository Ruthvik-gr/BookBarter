import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../config/api";
import BookCard from "../BookCard";
import BookModal from "../Modals/Modal";

const YourLibrary = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserBooks = useCallback(async (author, genre) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/books/user", {
        params: {
          author: author || "all",
          genre: genre || "all",
        },
        withCredentials: true,
      });

      setBooks(data.books);
      setAuthors(data.authors || []);
      setGenres(data.genres || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user books:", error);
      setBooks([]);
      setAuthors([]);
      setGenres([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserBooks(selectedAuthor, selectedGenre);
  }, [fetchUserBooks, selectedAuthor, selectedGenre]);

  const handleAddBook = async (book) => {
    try {
      console.log("Book data received in YourLibrary:", book);
      const { data } = await axiosInstance.post("/books", book, {
        withCredentials: true,
      });
      console.log("Response from server after adding book:", data);
      setBooks((prevBooks) => [...prevBooks, data]);
      showToast("Book Added", `Successfully added ${data.title} by ${data.author}.`, "success");
    } catch (error) {
      console.error("Error adding book:", error.response?.data || error.message);
      showToast("Error", "Failed to add the book. Please try again.", "error");
    }
  };

  const handleEditBook = async (book) => {
    try {
      const { data } = await axiosInstance.put(`/books/${book._id}`, book, {
        withCredentials: true,
      });
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b._id === data._id ? data : b))
      );
      showToast("Book Updated", `Successfully updated ${data.title} by ${data.author}.`, "success");
    } catch (error) {
      console.error("Error editing book:", error.response?.data || error.message);
      showToast("Error", "Failed to update the book. Please try again.", "error");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/books/${bookId}`, { withCredentials: true });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      setLoading(false);
      showToast("Book Deleted", "Successfully deleted the book.", "success");
    } catch (error) {
      console.error("Error deleting book:", error.response?.data || error.message);
      showToast("Error", "Failed to delete the book. Please try again.", "error");
    }
  };

  const openModalForAdd = () => {
    setEditBook(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (book) => {
    setEditBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveBook = (book) => {
    if (editBook) {
      handleEditBook({ ...book, _id: editBook._id });
    } else {
      handleAddBook(book);
    }
  };

  const showToast = (title, message, type) => {
    console.log(`${type.toUpperCase()}: ${title} - ${message}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My Books</h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {authors.length > 0 && (
              <select
                className="form-select block w-full sm:w-auto px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
              >
                <option value="">All Authors</option>
                {authors.sort((a, b) => a.localeCompare(b)).map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            )}
            {genres.length > 0 && (
              <select
                className="form-select block w-full sm:w-auto px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.sort((a, b) => a.localeCompare(b)).map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You don't have any books. Add some books to your library!</p>
            <button
              className="bg-blue-500 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={openModalForAdd}
            >
              Add Book
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                userBooks={true}
                onEdit={() => openModalForEdit(book)}
                onDelete={() => handleDeleteBook(book._id)}
              />
            ))}
          </div>
        )}

        <button
          className="fixed bottom-4 right-4 bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline"
          onClick={openModalForAdd}
        >
          Add Book
        </button>
      </div>

      {isModalOpen && (
        <BookModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveBook}
          initialBook={editBook}
        />
      )}
    </div>
  );
};

export default YourLibrary;