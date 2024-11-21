"use client";
import { useState, useEffect } from "react";

function ListPage({ data, city, type }) {
  const [results, setResults] = useState(data);

  useEffect(() => {
    setResults(data);
  }, [data]);

  return (
    <div className=" text-gray-300 text-3xl">
      <h1>
        Results for {city} - {type}
      </h1>
      <div>
        {results && results.length > 0 ? (
          results.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <p>{item.city}</p>
              <p>{item.type}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default ListPage;
