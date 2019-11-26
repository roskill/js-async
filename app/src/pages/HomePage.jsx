import React, { useEffect, useState } from 'react';

const getData = (url, success) => {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', url);
  httpRequest.onload = () => success(httpRequest.responseText);
  httpRequest.send();
};

const HomePage = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const bhutanId = '1252634';
    const apiKey = '71f1013cc4a78d563d0eeaf9b93bfce8';
    const url =
      `https://api.openweathermap.org/data/2.5/weather?id=${bhutanId}&appid=${apiKey}`;
    getData(url, data => {
    const dataObj = JSON.parse(data);
    console.log(JSON.stringify(dataObj, null, 2));
    setWeather(dataObj);
  });
  }, []);

  return (
    <div>
      <h2>Homepage</h2>  
      {JSON.stringify(weather)}    
    </div>
  );
};

export default HomePage;
