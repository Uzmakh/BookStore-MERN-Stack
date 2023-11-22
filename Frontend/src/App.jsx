import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Books from "./routes/Books/book";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element = { <Home/>} />
          <Route path="/about" element = { <About />} />
          <Route path="/books" element = { <Books />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
