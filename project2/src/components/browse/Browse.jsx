import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";

function Browse() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const jobSeeker = sessionStorage.getItem("jobSeeker");
  const jobSeekerId = jobSeeker ? JSON.parse(jobSeeker).jobSeekerId : null;

  useEffect(() => {
    if (!jobSeekerId) {
      navigate("/login");
    }
  }, [jobSeekerId, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/joblistings"
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
        setError(
          "Failed to fetch job listings. Please check your network connection or the backend server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = jobs.filter((job) =>
      job.jobDescription.toLowerCase().includes(searchTerm)
    );
    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId) => {
    try {
      if (!jobSeekerId) {
        alert("User not logged in or job seeker ID not found.");
        return;
      }
      console.log(jobSeekerId);
      console.log(jobId);
      const payload = {
        jobSeekerId: jobSeekerId,
        jobId: jobId,
      };

      await axios.post(
        "http://localhost:8080/applications/createApplication",
        payload
      );

      alert("Job applied successfully");
    } catch (error) {
      console.error("Error applying for the job:", error);
      alert("Failed to apply for the job");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Browse Jobs</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by job description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-l-md w-full max-w-md"
        />
        <button
          onClick={() => handleSearchChange({ target: { value: searchTerm } })}
          className="bg-[#02367B] text-white p-2 rounded-r-md ml-2 hover:bg-[#006CA5] focus:outline-none focus:ring-2 focus:ring-[#02367B]"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="bg-white p-4 rounded-lg shadow-md" key={job.jobId}>
              <h2 className="text-xl font-semibold text-[#02367B]">
                {job.jobTitle}
              </h2>
              <p className="text-gray-700 mt-2">{job.jobDescription}</p>
              <p className="text-gray-500 mt-2">
                Recruiter ID: {job.recruiterId}
              </p>
              <p className="text-gray-500 mt-2">Skill ID: {job.skillId}</p>
              <button
                onClick={() => handleApply(job.jobId)}
                className="bg-[#02367B] text-white p-2 rounded-md mt-4 hover:bg-[#006CA5] focus:outline-none focus:ring-2 focus:ring-[#02367B]"
              >
                Apply
              </button>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default Browse;
