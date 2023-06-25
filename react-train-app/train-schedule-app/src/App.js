import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://104.211.219.98/train';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODc2ODAxODUsImNvbXBhbnlOYW1lIjoiU2hhaWsgU3VoYXMgVHJhZGVycyIsImNsaWVudElEIjoiMGNlZWQ0ZDEtZTlhOC00ZGE4LTkwYmItNDFhZDIyYWQ3NGQzIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwUjExQTY5NTEifQ.hRq01dSa4a0Zalsz1dRnegIJSxOttvFDy36UlwE6Hjc"

const App = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${API_URL}/trains`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>All Trains Schedule</h1>
      <div>
        {trains.map((train) => (
          <div key={train.id}>
            <h2>Train #{train.id}</h2>
            <p>Departure: {train.departureTime}</p>
            <p>Delay: {train.delay} minutes</p>
            <p>Seats Availability: {train.seatsAvailability}</p>
            <p>Price (Sleeper): {train.prices.sleeper}</p>
            <p>Price (AC): {train.prices.ac}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
