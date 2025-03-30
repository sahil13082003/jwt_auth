import React, { useState } from 'react';
import { register } from '../services/authServices'; // Importing the register function
import { useNavigate } from 'react-router-dom'; // For navigation after registration

const Register = () => {
    // **State for Form Inputs**
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role set to "user"
    const [error, setError] = useState('');

    // For navigation after successful registration
    const navigate = useNavigate();

    // **Handle Form Submission**
    const onSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from reloading
        try {
            // Send form data to backend
            const response = await register({ name, email, password, role });
            console.log('User registered:', response.data);
            alert("Registration successful!"); // Success message
            navigate('/'); 
        } catch (error) {
            // Handle backend errors
            console.error('Error registering user:', error.response?.data?.message);
            setError(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form 
                onSubmit={onSubmit} 
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl mb-4 font-semibold text-center">Register</h2>

                {/* Name Input */}
                <label htmlFor="name" className="block mb-2 font-medium">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full p-2 mb-3 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/* Email Input */}
                <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password Input */}
                <label htmlFor="password" className="block mb-2 font-medium">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    className="w-full p-2 mb-3 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Role Dropdown */}
                <label htmlFor="role" className="block mb-2 font-medium">Role:</label>
                <select
                    id="role"
                    name="role"
                    className="w-full p-2 mb-3 border rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                </select>

                {/* Show Error if Exists */}
                {error && <p className="text-red-500 mb-3">{error}</p>}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>

                <p className="mt-3 text-sm">
                    Already have an account? <a href="/" className="text-blue-500">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
