import { Router } from "express";
const router = Router();
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controller/bookController.js";

router.route("/").post(createBook).get(getBooks);
router
  .route("/:bookId")
  .get(getBook)
  .patch(updateBook)
  .delete(deleteBook);
export default router;
