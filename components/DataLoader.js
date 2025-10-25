// File: frontend/src/components/DataLoader.js (or similar)

import React, { useState, useEffect } from 'react';

function DataLoader() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        // 1. Target the specific backend endpoint
        fetch('http://localhost:3000/api/data') 
            .then(response => {
                if (!response.ok) {
                    // Handle non-200 status codes (e.g., 404, 500)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 2. Parse the JSON response
            })
            .then(apiData => {
                setData(apiData.message); // Access the specific data key
                setError(null);
            })
            .catch(err => {
                // 3. Handle network errors or failed requests
                setError(`Failed to connect to backend: ${err.message}`);
                setData(null);
            })
            .finally(() => {
                setLoading(false); // 4. Remove loading state
            });
    }, []);

    // 5. Interface with UI by displaying state
    if (loading) return <div>Loading data from the backend...</div>;
    if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

    return <h1>Backend Message: {data}</h1>;
}

export default DataLoader;