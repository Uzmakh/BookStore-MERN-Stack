import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Book = () => {
  const baseUrl = "http://localhost:5173/api/book";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data!")
        }
        const jsonData = await response.json();

        setData(jsonData);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <h2>Fetch Example</h2>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <ul className="books">
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`/book/${item.slug}`}>
              <img src={`http://localhost:5173/uploads/${item.thumbnail}`} alt={item.title} />
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
