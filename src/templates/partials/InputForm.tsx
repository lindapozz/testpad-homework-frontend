import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import Top50Table from './Top50Table';

type Url = {
  url: string;
  result: number;
};

function InputForm() {
  const [isLoading, setIsLoading] = useState(false);
  var parser = new DOMParser();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [result, setResult] = useState(null);
  const [top50, setTop50] = useState([]);

  const textTags = [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'span',
    'strong',
    'em',
    'mark',
    'del',
    'ins',
    'sub',
    'sup',
    'pre',
    'code',
    'kbd',
    'samp',
    'var',
    'cite',
    'abbr',
    'acronym',
    'blockquote',
  ];

  const handleTagChange = (e) => {
    setSelectedTags((prevState) => {
      if (e.target.checked) {
        return [...prevState, e.target.value];
      } else {
        return prevState.filter((tag) => tag !== e.target.value);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    setIsLoading(true);
    selectedTags.sort;
    fetch('http://127.0.0.1:8000/words/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url, selectedTags: selectedTags }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        setTop50(data.top50Results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('An error occured while fetching the data');
        setIsLoading(false);
      });
  };

  const validateUrl = (url: string) => {
    const pattern = new RegExp(
      /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
    );
    return pattern.test(url);
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
      <p className="text-white font-bold my-4">
        Pick and choose your text tags like a boss, or let 'em all loose like a wild animal
      </p>
      <div className="md:w-6/12 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {textTags.map((tag, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={handleTagChange}
              />
              <p className="text-white">{tag}</p>
            </label>
          </div>
        ))}
      </div>
      <input
        className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
        value="Submit"
      />
      {result && (
        <div>
          <p className="text-white mb-4">Result: {result}</p>
        </div>
      )}
      {top50.length !== 0 && (
        <div className="overflow-y-auto h-500">
          <Top50Table top50={top50}></Top50Table>
        </div>
      )}
    </form>
  );
}

export default InputForm;
