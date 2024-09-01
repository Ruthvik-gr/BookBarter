import { useEffect, useState, useCallback } from "react";
import BookCard from "../BookCard";
import axiosInstance from "../../config/api";

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/books", {
        params: {
          author: selectedAuthor || "all",
          genre: selectedGenre || "all",
        },
      });
      setAllBooks(data.books);
      setAuthors(data.authors);
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching books and filters:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedAuthor, selectedGenre]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAuthorChange = (e) => setSelectedAuthor(e.target.value);
  const handleGenreChange = (e) => setSelectedGenre(e.target.value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">Book Barter</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Find Your Book</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <select
                id="author"
                value={selectedAuthor}
                onChange={handleAuthorChange}
                className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
              >
                <option value="all">All Authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select
                id="genre"
                value={selectedGenre}
                onChange={handleGenreChange}
                className="w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
              >
                <option value="all">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allBooks.length > 0 ? (
              allBooks.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="col-span-full text-center text-xl text-gray-600">No books available at the moment.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;