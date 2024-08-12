import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Label = ({ children }) => (
  <label className="block font-medium text-gray-700 mb-2">{children}</label>
);

const Input = (props) => (
  <input
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const response = await axios.post(
        "http://localhost:8080/api/jobseekers/login",
        { email, password }
      );

      sessionStorage.setItem("jobSeeker", JSON.stringify(response.data));
      // Handle successful login
      console.log(response.data);
      // Assuming successful login returns a token or user data
      // localStorage.setItem("token", response.data.token);
      navigate("/browse"); // Redirect to a protected route
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred");
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("Error in setting up the request: " + err.message);
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          {/* Email */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="my-2">
            <button
              type="submit"
              className={`w-full px-4 py-2 ${
                loading ? "bg-gray-400" : "bg-[#02367B]"
              } text-white font-bold rounded-md hover:${
                loading ? "bg-gray-500" : "bg-[#006CA5]"
              } focus:outline-none focus:ring-2 focus:ring-[#02367B]`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
              <span>
                Don't have an account?
                <Link to="/signup" className="text-[#006CA5] ml-1">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
