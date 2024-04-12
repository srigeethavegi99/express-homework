const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

let books = [
    { id: 1, title: 'Book 1' },
    { id: 2, title: 'Book 2' },
    { id: 3, title: 'Book 3' }
];

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public', 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.render('index', {books})
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = books.find((b) => b.id === parseInt(id));
  
    if (!book) {
      return res.status(404).send('Book not found');
    }
  
    res.render('book', { book });
});

app.post('/books', (req, res) => {
    const id = books.length + 1;
    const title = req.body.title;
    books.push({ id, title });
    console.log(`${title} book added. New length is ${books.length}`);
    res.redirect('/');
});

app.post('/books/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let book = books.find((b) => b.id === id);
    let method = req.body._method;
  
    if (method === 'delete') {
      books = books.filter((book) => book.id !== id);
      console.log(`Book with ID ${id} deleted. New length is ${books.length}`);
      res.redirect('/');
    }
});

app.listen(port, ()=>console.log(`App is running on http://localhost:${port}`))