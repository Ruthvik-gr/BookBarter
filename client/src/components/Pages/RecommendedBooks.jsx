import { useEffect, useState, useCallback } from "react";
import BookCard from "../BookCard";
import axiosInstance from "../../config/api";

const RecommendedBooks = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendedBooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/books/matches");
      setRecommendedBooks(data);
    } catch (error) {
      console.error("Error fetching recommended books:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedBooks();
  }, [fetchRecommendedBooks]);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recommendedBooks.length > 0 ? (
            recommendedBooks.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No recommended books available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedBooks;

