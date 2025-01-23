import Books from "../model/book.js";
import handleBookError from "../utils/handleBookError.js";

const createBook = async (req, res) => {
  try {
    const book = await Books.create(req.body);
    return res.status(201).json({ success: true, book });
  } catch (error) {
    const errors = handleBookError(error);
    return res.status(400).json(errors);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});

    return res
      .status(200)
      .json({ success: true, counts: books.length, data: books });
  } catch (error) {
    const errors = handleBookError(error);
    return res.status(500).json(errors);
  }
};

const getBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Books.findOne({ _id: bookId });

    if (!book) {
      throw new Error("Could not find book");
    }
    return res.status(200).json({ success: true, data: book });
  } catch (error) {
    const errors = handleBookError(error);
    return res.status(500).json(errors);
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Books.findOneAndUpdate({ _id: bookId }, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({ success: true, data: book });
  } catch (error) {
    const errors = handleBookError(error);
    return res.status(500).json(errors);
  }
};
const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await Books.findOneAndDelete({ _id: bookId });
    return res
      .status(200)
      .json({ success: true, msg: "Book deleted successfully" });
  } catch (error) {
    const errors = handleBookError(error);
    return res.status(500).json(errors);
  }
};

export { createBook, getBooks, getBook, updateBook, deleteBook };
