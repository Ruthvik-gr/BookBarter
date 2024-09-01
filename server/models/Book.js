import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: false
    },
    imageLink: {
        type: String,
        required: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
});
 
const Book = mongoose.model('Book', BookSchema);

export default Book;