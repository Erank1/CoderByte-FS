var express = require('express');
var router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

/* GET home page. */
router.get('/addBook',async function(req, res, next) {
  //res.render('index', { title: 'Express' });
  const authors = await Author.find({}).sort({_id: -1});
  const book = new Book();
  res.render('books/addBook', {book: book, authors: authors});
});

router.get('/' ,async function(req,res,next){
  const books = await Book.find({}).sort({_id: -1});
  res.render('books/index', {books})
});
router.get('/:id' ,async function(req,res,next){
  const book = await Book.find(req.query.id);
  res.render('books/book', {book})
});
router.post('/', async function(req, res, next){
  const book = new Book(req.body);
  try{
    await book.save();
    res.redirect('/books/addBook')
  } catch {
    res.render('books/addBook', {book:book});
  }
});
module.exports = router;
