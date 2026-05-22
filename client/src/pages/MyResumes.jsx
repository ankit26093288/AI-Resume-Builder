import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyResumes() {

const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {

    fetchResumes();

  }, []);

  const fetchResumes = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/resume/all"
      );

      setResumes(response.data);

    } catch (error) {

      console.log(error);

    }

  };
  const deleteResume = async (id) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/resume/delete/${id}`
    );

    alert("Resume Deleted");

    fetchResumes();

  } catch (error) {

    console.log(error);

    alert("Delete Failed");

  }

};

  return (

    <div
      className="min-h-screen p-10"
      style={{ backgroundColor: "#f3f4f6" }}
    >

      <h1 className="text-4xl font-bold mb-10">
        My Resumes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {resumes.map((resume) => (

          <div
            key={resume._id}
            className="p-6 rounded-2xl"
            style={{ backgroundColor: "white" }}
          >

            <h2 className="text-2xl font-bold mb-2">
              {resume.fullName}
            </h2>

            <p style={{ color: "#4b5563" }}>
              {resume.email}
            </p>

            <div className="mt-4">

              <h3 className="font-semibold">
                Skills
              </h3>

              <p style={{ color: "#374151" }}>
                {resume.skills}
              </p>

            </div>
            <button
  onClick={() => deleteResume(resume._id)}
  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
>
  Delete
</button>
<button
  onClick={() => navigate(`/edit-resume/${resume._id}`)}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 mr-4"
>
  Edit
</button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MyResumes;