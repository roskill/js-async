import React, { useEffect, useState } from 'react';

const getDataPromise = url => {
  return new Promise((resolve, reject) => {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.onload = () => {
      if (httpRequest.status === 200) {
        resolve(httpRequest.response);
      } else {
        reject(Error(httpRequest.statusText));
      }
    };

    // Handle network errors
    httpRequest.onerror = () => reject(Error('Network Error'));

    httpRequest.send();
  });
};

const HomePage = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const apiKey = '71f1013cc4a78d563d0eeaf9b93bfce8';
    const locations = [
      'los+angeles,us',
      'san+francisco,us',
      'lone+pine,us',
      'mariposa,us'
    ];

    const urls = locations.map(
      location =>
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );

    setWeather({});

    (async () => {
      let responses = [];
      responses.push(await getDataPromise(urls[0]));
      responses.push(await getDataPromise(urls[1]));
      responses.push(await getDataPromise(urls[2]));
      responses.push(await getDataPromise(urls[3]));
      responses.map(response => console.log(response));
    })();
  }, []);

  return (
    <div>
      <h2>Homepage</h2>
      {JSON.stringify(weather)}
    </div>
  );
};

export default HomePage;
