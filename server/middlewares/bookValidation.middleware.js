import mongoose from 'mongoose';

const validateBookDetails = (req, res, next) => {
    const { title, author, genre, imageLink } = req.body;
    const userId = req.userId;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Invalid or empty title' });
    }

    if (!author || typeof author !== 'string' || author.trim() === '') {
        return res.status(400).json({ error: 'Invalid or empty author' });
    }

    if (!genre || typeof genre !== 'string' || genre.trim() === '') {
        return res.status(400).json({ error: 'Invalid or empty genre' });
    }

    if (imageLink && typeof imageLink !== 'string') {
        return res.status(400).json({ error: 'Invalid image link' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    next();
}

const validateBookEdit = (req, res, next) => {
    const { title, author, genre, description, imageLink } = req.body;

    if(!title || !author || !genre) {
        return res.status(400).json({error: "Provide data to edit"});
    }

    if (typeof title !== 'string' || typeof author !== 'string' || typeof genre !== 'string') {
        return res.status(400).json({ error: "Fields must be strings" });
    }

    if (imageLink && typeof imageLink !== 'string') {
        return res.status(400).json({ error: 'Invalid image link' });
    }

    req.body.title = title.trim();
    req.body.author = author.trim();
    req.body.genre = genre.trim();
    req.body.description = description ? description.trim() : '';
    req.body.imageLink = imageLink ? imageLink.trim() : '';

    next();
}

export {
    validateBookDetails,
    validateBookEdit
}