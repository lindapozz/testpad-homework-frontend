import React, { useState, useEffect } from 'react';

import Header from './partials/Header';
import Footer from './partials/Footer';
import Spinner from './partials/Spinner';

function Results() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:8000/api/urls/')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('An error occured while fetching the data');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow my-40">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Results:
            </h1>
            {error && <div className="text-red">{error}</div>}
            {data && (
              <table className="md:w-3/12 mx-auto text-white mx-auto h-400 border-separate border border-slate-400">
                <thead>
                  <tr>
                    <th className="border border-slate-300">URL</th>
                    <th className="border border-slate-300">RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item['url']}>
                      <td className="border border-slate-300">{item['url']}</td>
                      <td className="border border-slate-300">{item['result']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Results;
