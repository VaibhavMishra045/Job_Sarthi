import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Job Sarthi Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Whether you're a job seeker or an employer, creating an account on Job Sarthi opens up a world of opportunities and resources tailored to your specific needs. 
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
              Quickly find jobs that match your skills and interests by entering specific keywords./Post your job openings in minutes with our user-friendly job posting form.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
              Browse thousands of job listings across various industries, roles, and locations. OR Create detailed job descriptions that attract the right candidates, including responsibilities, qualifications, and perks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
