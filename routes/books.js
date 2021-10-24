var express = require('express');
var router = express.Router();
const Book = require('../models/book')

/* GET home page. */
router.get('/addBook', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  const book = new Book();
  res.render('books/addBook', {book: book});
});

router.get('/' ,async function(req,res,next){
  const books = await Book.find({}).sort({_id: -1});
  console.log("hi im here")
  res.render('posts/index', {books})
});

router.post('/', async function(req, res, next){
  const book = new Book(req.body);
  try{
    await book.save();
    res.redirect('/books/addBook')
  } catch {
    res.render('books/addBook', {book:book});
    //return next('error');
  }
});
module.exports = router;
