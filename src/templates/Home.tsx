import React from 'react';
import Link from 'react-router-dom';

import Header from './partials/Header';
import InputForm from './partials/InputForm';
import Footer from './partials/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow mt-40">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
          Count the words:
        </h1>
        <InputForm />
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          href="/results"
        >
          See all the urls fetched
        </a>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
