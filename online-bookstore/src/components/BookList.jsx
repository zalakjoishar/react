import React from "react";

const booksData = [
  { id: 1, title: "React Basics", author: "John Doe", price: 25 },
  { id: 2, title: "Advanced React", author: "Jane Smith", price: 40 },
  { id: 3, title: "React Testing", author: "Alice Johnson", price: 30 },
];

function BookList({ addToCart }) {
  return (
    <div>
      <h2>Book List</h2>
      {booksData.map((book) => (
        <div key={book.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Price: ${book.price}</p>
          <button onClick={loadBooks}>Load Books</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;
