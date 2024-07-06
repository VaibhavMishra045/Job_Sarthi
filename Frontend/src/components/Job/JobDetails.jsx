// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../../main";
// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState({});
//   const navigateTo = useNavigate();

//   const { isAuthorized, user } = useContext(Context);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setJob(res.data.job);
//       })
//       .catch((error) => {
//         navigateTo("/notfound");
//       });
//   }, []);

//   if (!isAuthorized) {
//     navigateTo("/login");
//   }

//   return (
//     <section className="jobDetail page">
//       <div className="container">
//         <h3>Job Details</h3>
//         <div className="banner">
//           <p>
//             Title: <span> {job.title}</span>
//           </p>
//           <p>
//             Category: <span>{job.category}</span>
//           </p>
//           <p>
//             Country: <span>{job.country}</span>
//           </p>
//           <p>
//             City: <span>{job.city}</span>
//           </p>
//           <p>
//             Location: <span>{job.location}</span>
//           </p>
//           <p>
//             Description: <span>{job.description}</span>
//           </p>
//           <p>
//             Job Posted On: <span>{job.jobPostedOn}</span>
//           </p>
//           <p>
//             Salary:{" "}
//             {job.fixedSalary ? (
//               <span>{job.fixedSalary}</span>
//             ) : (
//               <span>
//                 {job.salaryFrom} - {job.salaryTo}
//               </span>
//             )}
//           </p>
//           {user && user.role === "Employer" ? (
//             <></>
//           ) : (
//             <Link to={`/application/${job._id}`}>Apply Now</Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobDetails;
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <th>Title:</th>
                <td>{job.title}</td>
              </tr>
              <tr>
                <th>Category:</th>
                <td>{job.category}</td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>{job.country}</td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{job.city}</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>{job.location}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{job.description}</td>
              </tr>
              <tr>
                <th>Job Posted On:</th>
                <td>{job.jobPostedOn}</td>
              </tr>
              <tr>
                <th>Salary (in Thousands):</th>
                <td>
                  {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}
                </td>
              </tr>
            </tbody>
          </table>
          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`} className="apply-button">Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
