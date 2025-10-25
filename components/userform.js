// File: frontend/src/components/UserForm.js

import React, { useState } from 'react';
import { createUser } from '../services/userService'; // <-- Correctly imports the function

function UserForm() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setSubmitError(null);
        setSuccessMsg(null);

        try {
            const newUser = { name };
            await createUser(newUser);

            setSuccessMsg(`User '${name}' created successfully!`); 
            setName(''); 
        } catch (error) {
            // Note: The error object here will contain the message thrown in userService.js
            setSubmitError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="User Name" 
                disabled={loading} 
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Create User'}
            </button>
            {submitError && <p style={{color: 'red'}}>{submitError}</p>}
            {successMsg && <p style={{color: 'green'}}>{successMsg}</p>}
        </form>
    );
}

export default UserForm;