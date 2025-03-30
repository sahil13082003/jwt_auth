import React, { useState } from 'react';
import { login } from '../services/authServices'; // Importing login service
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {

    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // To navigate to another route after login
    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload on form submit
        try {
            // Send login request
            const response = await login({ email, password });
            console.log('Login successful:', response.data);
            
            // Store token in localStorage
            localStorage.setItem("token", response.data.token);

            // Navigate to dashboard after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error.response?.data?.message);
            setError(error.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form 
                onSubmit={onSubmit} 
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl mb-4">Login</h2>

                {/* Email Input */}
                <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state
                    required
                />

                {/* Password Input */}
                <label htmlFor="password" className="block mb-2 font-medium">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full p-2 mb-3 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Show Error if Exists */}
                {error && <p className="text-red-500 mb-3">{error}</p>}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                
                <p className="mt-3 text-sm">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
