import React, { useEffect, useState } from 'react';

// const getData = (url, success) => {
//   let httpRequest = new XMLHttpRequest();
//   httpRequest.open('GET', url);
//   httpRequest.onload = () => success(httpRequest.responseText);
//   httpRequest.send();
// };

const getDataPromise = (url) => {
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
  })
};

const HomePage = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    // const bhutanId = '1252634';
    const apiKey = '71f1013cc4a78d563d0eeaf9b93bfce8';
    const locations = [
      'los+angeles,us',
      'san+francisco,us',
      'lone+pine,us',
      'mariposa,us'
    ];

    const urls = locations.map(location => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)

    // const url =
    //   `https://api.openweathermap.org/data/2.5/weather?id=${bhutanId}&appid=${apiKey}`;
  //   getData(url, data => {
  //   const dataObj = JSON.parse(data);
  //   console.log(JSON.stringify(dataObj, null, 2));
  //   setWeather(dataObj);
  // });
  // getDataPromise(url)
  setWeather({});

  Promise.all([getDataPromise(urls[0]), getDataPromise(urls[1]), getDataPromise(urls[2]), getDataPromise(urls[3])])
    .then(responses => {
      responses.map(response => console.log(response))
    })
    .catch(status => console.log(status));
}, []);

  return (
    <div>
      <h2>Homepage</h2>  
      {JSON.stringify(weather)}    
    </div>
  );
};

export default HomePage;
