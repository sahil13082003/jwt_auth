import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    
    // State for user info
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user from localStorage
        } else {
            navigate("/dashboard"); // Redirect if no user
        }
    }, [navigate]);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, !</h1>

            
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                    <p>Manage Users, View Reports, and Configure Settings.</p>
                    <button className="mt-4 p-2 bg-red-500 text-white rounded-lg" onClick={() => navigate("/manage-users")}>Manage Users</button>
                </div>
            
                <div className="bg-green-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">User Dashboard</h2>
                    <p>View Orders, Track Shipments, and Update Profile.</p>
                    <button className="mt-4 p-2 bg-blue-500 text-white rounded-lg" onClick={() => navigate("/profile")}>View Profile</button>
                </div>
            

            <button 
                className="mt-4 p-2 bg-gray-800 text-white rounded-lg"
                onClick={() => {
                    localStorage.removeItem("user"); // Clear storage
                    navigate("/login"); // Redirect to login
                }}
            >
                Logout
            </button>
        </div>
    );
}
