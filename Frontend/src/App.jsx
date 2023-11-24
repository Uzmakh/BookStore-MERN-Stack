import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Books from "./routes/Books/book";
import SingleBook from "./routes/Books/singleBook";
import CreateBook from "./routes/Books/createBook";
import EditBook from "./routes/Books/editBook";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element = { <Home/>} />
          <Route path="/about" element = { <About/>} />
          <Route path="/books" element = { <Books/>} />
          <Route path="/books/:slug" element = { <SingleBook/>} />
          <Route path="/books/createBook" element = { <CreateBook/>} />
          <Route path="/editBook/:slug" element = { <EditBook/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
