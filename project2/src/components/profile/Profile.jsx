import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../shared/Navbar";

function Profile() {
  const [jobSeekerData, setJobSeekerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("jobSeeker");

    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    // Retrieve job seeker data from sessionStorage
    const storedData = sessionStorage.getItem("jobSeeker");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setJobSeekerData(parsedData);
      } catch (e) {
        setError("Error parsing job seeker data.");
      }
    } else {
      setError("No job seeker data found.");
    }

    setLoading(false);
  }, [navigate]); // Include navigate in the dependency array

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!jobSeekerData) return <p>No job seeker data available.</p>;

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Profile</h1>
          <div className="my-2">
            <h2 className="font-medium text-gray-700">Full Name</h2>
            <p>{jobSeekerData.jobSeekerFullName}</p>
          </div>
          <div className="my-2">
            <h2 className="font-medium text-gray-700">Email</h2>
            <p>{jobSeekerData.jobSeekerEmail}</p>
          </div>
          <div className="my-2">
            <h2 className="font-medium text-gray-700">Mobile Number</h2>
            <p>{jobSeekerData.jobSeekerMobileNumber}</p>
          </div>
          <div className="my-2">
            <h2 className="font-medium text-gray-700">Profile Summary</h2>
            <p>{jobSeekerData.jobSeekerProfileSummary}</p>
          </div>
          <div className="my-2">
            <h2 className="font-medium text-gray-700">Experience (years)</h2>
            <p>{jobSeekerData.jobSeekerExperience}</p>
          </div>
          <div className="my-2">
            <h2 className="font-medium text-gray-700">Skill ID</h2>
            <p>{jobSeekerData.skillId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
