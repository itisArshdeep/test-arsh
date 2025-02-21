"use client"
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const data = JSON.parse(input);
            const result = await axios.post('https://<your-heroku-app>.herokuapp.com/bfhl', { data });
            setResponse(result.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input.');
        }
    };

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedFilters([...selectedFilters, value]);
        } else {
            setSelectedFilters(selectedFilters.filter(filter => filter !== value));
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_alphabet } = response;
        const filteredResponse = {};

        if (selectedFilters.includes('numbers')) filteredResponse.numbers = numbers;
        if (selectedFilters.includes('alphabets')) filteredResponse.alphabets = alphabets;
        if (selectedFilters.includes('highest_alphabet')) filteredResponse.highest_alphabet = highest_alphabet;

        return JSON.stringify(filteredResponse, null, 2);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>ABCD123</h1>
            <textarea
                placeholder='Enter JSON input (e.g., {"data": ["M", "1", "334", "4", "B"]})'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '100%', height: '100px' }}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h3>Filters:</h3>
                    <label>
                        <input type="checkbox" value="numbers" onChange={handleFilterChange} /> Numbers
                    </label>
                    <label>
                        <input type="checkbox" value="alphabets" onChange={handleFilterChange} /> Alphabets
                    </label>
                    <label>
                        <input type="checkbox" value="highest_alphabet" onChange={handleFilterChange} /> Highest Alphabet
                    </label>
                    <h3>Response:</h3>
                    <pre>{renderResponse()}</pre>
                </div>
            )}
        </div>
    );
};

export default App;