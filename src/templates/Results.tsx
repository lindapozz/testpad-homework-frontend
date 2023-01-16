import React, { useState, useEffect } from 'react';

import Header from './partials/Header';
import Footer from './partials/Footer';
import Spinner from './partials/Spinner';

function Results() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/api/urls/')
      .then((response) => response.json())
      .then((data) => setData(data));
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow mt-40 text-white mx-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Results:
            </h1>
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>RESULT</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item['url']}>
                    <td>{item['url']}</td>
                    <td>{item['result']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Results;
