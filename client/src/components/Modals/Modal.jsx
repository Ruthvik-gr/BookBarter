import { useState, useEffect } from "react";

const BookModal = ({ isOpen, onClose, onSave, initialBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title || "");
      setAuthor(initialBook.author || "");
      setGenre(initialBook.genre || "");
      setDescription(initialBook.description || "");
      setImageLink(initialBook.imageLink || "");
    } else {
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setImageLink("");
    }
  }, [initialBook]);

  const handleSave = () => {
    const book = { title, author, genre, description, imageLink };
    console.log("Book data in modal before saving:", book);
    onSave(book);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
            {initialBook ? "Edit Book" : "Add Book"}
          </h3>
          <div className="mt-2 space-y-4">
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Book Author"
            />
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Book Genre"
            />
            <textarea
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Book Description"
              rows="4"
            />
            <input
              type="text"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Image Link"
            />
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;