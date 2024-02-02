import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Book = () => {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetching data from the selected category,
        let url = baseUrl;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data!")
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError("Error fetching data. Please try again later.")
        setIsLoading(false)
      }
    }
    fetchData()
  }, [selectedCategory])

  return (
    // This is the portion where books are being displayed on the page
    <div>
      <h1>Books</h1>
      <p>This is where we need Nodejs, Express and MongoDB to grab the data; so the data below is pulled from the MongoDB database.</p>

      <Link to={"/books/createBook"}> + Add New Book </Link>
      <h2>Fetch Example</h2>

      <div className="filters">
        <label>Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>

          <option value="all">All</option>
          <option value="fiction">Fiction</option>
          <option value="romance">Romance</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="science">Science</option>
          <option value="horror">Horror</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* condition implied through ternary operator; ?
    if Loading 
    if not Loading */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img src={`http://localhost:8000/uploads/${item.thumbnail}`} alt={item.title} />
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Book;
