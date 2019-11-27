import React, { useEffect, useState } from 'react';

const kelvinToCelcius = temp => (temp - 273.15).toFixed(0);

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
  const [weather, setWeather] = useState([]);

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

    (async () => {
      try {
        let responses = [];
        responses.push(JSON.parse(await getDataPromise(urls[0])));
        responses.push(JSON.parse(await getDataPromise(urls[1])));
        responses.push(JSON.parse(await getDataPromise(urls[2])));
        responses.push(JSON.parse(await getDataPromise(urls[3])));
        responses.map(response => console.log(response));
        setWeather(responses);
      } catch (status) {
        console.log(status);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Weather</h2>
      {weather.map((location, key) => (
        <div key={key}>
          <h4>{location.name}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}
          />
          <p>{`Temperature: ${kelvinToCelcius(location.main.temp)}°C`}</p>
          <p>{`${location.weather[0].main}, ${location.weather[0].description}`}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
