// File: frontend/src/services/userService.js

// Ensure your backend's port (e.g., 3000) and endpoint path are correct
const API_URL = 'http://localhost:3000/api/users'; 

export async function createUser(userData) {
    const response = await fetch(API_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
    });

    if (!response.ok) {
        // Attempt to parse the server's error message
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Failed to create user');
    }

    // Return the successful JSON response (the new user object)
    return response.json();
}