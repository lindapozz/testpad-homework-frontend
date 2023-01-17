import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && 'backdrop-blur-sm shadow-lg'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="TestPad">
              <img
                width="160"
                src="https://testpad.com/static/images/white_logo7.svg?fp=a1a64f1f"
                id="testpad"
                alt="Testpad, a manual testing tool that reinvents traditional test case management"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
