import React, { useEffect, useRef, useState } from 'react';
import Link from 'react-router-dom';
import anime from 'animejs';

import Header from './partials/Header';
import InputForm from './partials/InputForm';
import Footer from './partials/Footer';

function Home() {
  const textWrapperRef = useRef<HTMLElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = [
    'Count the words like a boss counting his stacks of cash',
    'Word-tallying like a pirate counting his treasure',
    'Word-scooping like a ice-cream man counting his scoops',
    'Word-numbering like a mathematician counting his equations',
    'Word-counting like a librarian counting her books',
    'Word-tabulating like a accountant counting his budget',
    'Word-counting like a detective counting clues',
    'Word-inventorying like a shopkeeper counting his goods',
    'Word-tabulating like a scientist counting his experiments',
    'Word-measuring like a baker counting his doughnuts',
    'Word-counting like a chef counting his ingredients',
  ];

  useEffect(() => {
    handleAnimate();
  }, [textWrapperRef, titleIndex]);

  const handleAnimate = () => {
    const textWrapper = textWrapperRef.current;
    if (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      anime.timeline({ loop: true }).add({
        targets: '.ml6 .letter',
        translateY: ['1.1em', 0],
        translateZ: 0,
        duration: 3000,
        delay: (el, i) => 50 * i,
        complete: () => {
          setTitleIndex((titleIndex + 1) % titles.length);
        },
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow my-40">
        <h1 className="relative text-white text-2xl md:text-4xl font-extrabold leading-tighter tracking-tighter mb-4 ml6">
          <span className="text-wrapper">
            <span className="letters" ref={textWrapperRef}>
              {titles[titleIndex]}
            </span>
          </span>
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
