// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import ResumeModal from "./ResumeModal";

// const MyApplications = () => {
//   const { user,isAuthorized } = useContext(Context);
//   const [applications, setApplications] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [resumeImageUrl, setResumeImageUrl] = useState("");

  
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//       return;
//     }

//     if (user && user.role === "Employer") {
//       axios
//         .get("http://localhost:4000/api/v1/application/employer/getall", {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setApplications(res.data.applications);
//         })
//         .catch((error) => {
//           toast.error(error.response?.data?.message || "Something went wrong");
//         });
//     } else {
//       axios
//         .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setApplications(res.data.applications);
//         })
//         .catch((error) => {
//           toast.error(error.response?.data?.message || "Something went wrong");
//         });
//     }
//   }, [isAuthorized, user, navigateTo]);

//   const deleteApplication = (id) => {
//     try {
//       axios
//         .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           toast.success(res.data.message);
//           setApplications((prevApplication) =>
//             prevApplication.filter((application) => application._id !== id)
//           );
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const openModal = (imageUrl) => {
//     setResumeImageUrl(imageUrl);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <section className="my_applications page">
//       {user && user.role === "Job Seeker" ? (
//         <div className="container">
//           <h1>My Applications</h1>
//           {applications.length <= 0 ? (
//             <>
//               {" "}
//               <h4>No Applications Found</h4>{" "}
//             </>
//           ) : (
//             applications.map((element) => {
//               return (
//                 <JobSeekerCard
//                   element={element}
//                   key={element._id}
//                   deleteApplication={deleteApplication}
//                   openModal={openModal}
//                 />
//               );
//             })
//           )}
//         </div>
//       ) : (
//         <div className="container">
//           <h1>Applications From Job Seekers</h1>
//           {applications.length <= 0 ? (
//             <>
//               <h4>No Applications Found</h4>
//             </>
//           ) : (
//             applications.map((element) => {
//               return (
//                 <EmployerCard
//                   element={element}
//                   key={element._id}
//                   openModal={openModal}
//                 />
//               );
//             })
//           )}
//         </div>
//       )}
//       {modalOpen && (
//         <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
//       )}
//     </section>
//   );
// };

// export default MyApplications;

// const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span> {element.coverLetter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div>
//         <div className="btn_area">
//           <button onClick={() => deleteApplication(element._id)}>
//             Delete Application
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const EmployerCard = ({ element, openModal }) => {
//   return (
//     <>
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span> {element.coverLetter}
//           </p>
//         </div>
//         <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user && user.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";
        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchApplications();
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my-applications-page">
      {user && user.role === "Job Seeker" ? (
        <div className="my-applications-container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="my-applications-container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="my-applications-card">
      <div className="my-applications-detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="my-applications-resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="my-applications-btn-area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="my-applications-card">
      <div className="my-applications-detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="my-applications-resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};


// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import ResumeModal from "./ResumeModal";

// const MyApplications = () => {
//   const { user, isAuthorized } = useContext(Context);
//   const [applications, setApplications] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [resumeImageUrl, setResumeImageUrl] = useState("");

//   const navigateTo = useNavigate();

//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//       return;
//     }

//     const fetchApplications = async () => {
//       try {
//         let response;
//         if (user && user.role === "Employer") {
//           response = await axios.get("http://localhost:4000/api/v1/application/employer/getall", {
//             withCredentials: true,
//           });
//         } else {
//           response = await axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", {
//             withCredentials: true,
//           });
//         }
//         setApplications(response.data.applications);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Something went wrong");
//       }
//     };

//     fetchApplications();
//   }, [isAuthorized, user, navigateTo]);

//   const deleteApplication = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       setApplications((prevApplications) =>
//         prevApplications.filter((application) => application._id !== id)
//       );
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const openModal = (imageUrl) => {
//     setResumeImageUrl(imageUrl);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <section className="my_applications page">
//       {user && user.role === "Job Seeker" ? (
//         <div className="container">
//           <h1>My Applications</h1>
//           {applications.length <= 0 ? (
//             <h4>No Applications Found</h4>
//           ) : (
//             applications.map((element) => (
//               <JobSeekerCard
//                 element={element}
//                 key={element._id}
//                 deleteApplication={deleteApplication}
//                 openModal={openModal}
//               />
//             ))
//           )}
//         </div>
//       ) : (
//         <div className="container">
//           <h1>Applications From Job Seekers</h1>
//           {applications.length <= 0 ? (
//             <h4>No Applications Found</h4>
//           ) : (
//             applications.map((element) => (
//               <EmployerCard
//                 element={element}
//                 key={element._id}
//                 openModal={openModal}
//               />
//             ))
//           )}
//         </div>
//       )}
//       {modalOpen && (
//         <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
//       )}
//     </section>
//   );
// };

// export default MyApplications;

// const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
//   return (
//     <div className="job_seeker_card">
//       <div className="detail">
//         <p>
//           <span>Name:</span> {element.name}
//         </p>
//         <p>
//           <span>Email:</span> {element.email}
//         </p>
//         <p>
//           <span>Phone:</span> {element.phone}
//         </p>
//         <p>
//           <span>Address:</span> {element.address}
//         </p>
//         <p>
//           <span>CoverLetter:</span> {element.coverLetter}
//         </p>
//       </div>
//       <div className="resume">
//         <img
//           src={element.resume.url}
//           alt="resume"
//           onClick={() => openModal(element.resume.url)}
//         />
//       </div>
//       <div className="btn_area">
//         <button onClick={() => deleteApplication(element._id)}>
//           Delete Application
//         </button>
//       </div>
//     </div>
//   );
// };

// const EmployerCard = ({ element, openModal }) => {
//   return (
//     <div className="job_seeker_card">
//       <div className="detail">
//         <p>
//           <span>Name:</span> {element.name}
//         </p>
//         <p>
//           <span>Email:</span> {element.email}
//         </p>
//         <p>
//           <span>Phone:</span> {element.phone}
//         </p>
//         <p>
//           <span>Address:</span> {element.address}
//         </p>
//         <p>
//           <span>CoverLetter:</span> {element.coverLetter}
//         </p>
//       </div>
//       <div className="resume">
//         <img
//           src={element.resume.url}
//           alt="resume"
//           onClick={() => openModal(element.resume.url)}
//         />
//       </div>
//     </div>
//   );
// };



