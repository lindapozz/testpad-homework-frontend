import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

type Url = {
  url: string;
  result: number;
};

function InputForm() {
  const [isLoading, setIsLoading] = useState(false);
  var parser = new DOMParser();
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(0);
  const [words, setWords] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
      const htmlString = await response.text();
      const noScript = htmlString.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ''
      );
      const noTags = noScript.replace(/<[^>]+>/g, '');
      const plainText = noTags.replace(/[^\w\s]/gi, '');
      const words = plainText.split(' ').length;
      setWords(plainText);
      setResult(words);
      saveData(url, words);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const validateUrl = (url: string) => {
    const pattern = new RegExp(
      /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
    );
    return pattern.test(url);
  };

  const saveData = (url: string, words: number) => {
    const obj = {
      url: url,
      result: words,
    };
    fetch('http://localhost:8000/api/urls/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <form onSubmit={handleSubmit} className="mb-4">
      <label htmlFor="url" className="text-white">
        Insert the URL:
      </label>
      <div className="">
        <input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        {error && <div className="text-red">{error}</div>}
      </div>
      <input
        className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
        value="Submit"
      />
      <div>
        {result !== 0 && <p className="text-white mb-4">Result: {result}</p>}
        {words && <p className="text-white">The words are: {words}</p>}
      </div>
    </form>
  );
}

export default InputForm;
