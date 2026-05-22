import { useState, useRef, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";

function ResumeForm() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  const { id } = useParams();

  const resumeRef = useRef();

  // Fetch Resume For Edit
  useEffect(() => {

    if (id) {
      fetchResume();
    }

  }, [id]);

  const fetchResume = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/resume/${id}`
      );

      const data = response.data;

      setFullName(data.fullName || "");
      setEmail(data.email || "");
      setSkills(data.skills || "");
      setEducation(data.education || "");
      setExperience(data.experience || "");

    } catch (error) {

      console.log(error);

      alert("Failed To Fetch Resume");

    }

  };

  // Save OR Update Resume
  const handleSubmit = async () => {

    try {

      if (id) {

        await axios.put(
          `http://localhost:5000/api/resume/update/${id}`,
          {
            fullName,
            email,
            skills,
            education,
            experience,
          }
        );

        alert("Resume Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:5000/api/resume/create",
          {
            fullName,
            email,
            skills,
            education,
            experience,
          }
        );

        alert("Resume Saved Successfully");

      }

    } catch (error) {

      console.log(error);

      alert("Operation Failed");

    }

  };

  // Download PDF
  const downloadPDF = async () => {

    try {

      const element = resumeRef.current;

      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save("resume.pdf");

    } catch (error) {

      console.log(error);

      alert("PDF Download Failed");

    }

  };

  return (

    <div
      className="min-h-screen p-10"
      style={{ backgroundColor: "#f3f4f6" }}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Form Section */}
        <div
          className="p-8 rounded-2xl"
          style={{ backgroundColor: "white" }}
        >

          <h1 className="text-3xl font-bold mb-6">

            {id ? "Edit Resume" : "Create Resume"}

          </h1>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Skills"
            className="w-full p-3 border rounded-lg mb-4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <textarea
            placeholder="Education"
            className="w-full p-3 border rounded-lg mb-4"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />

          <textarea
            placeholder="Experience"
            className="w-full p-3 border rounded-lg mb-4"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <div className="flex gap-4">

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg"
            >
              {id ? "Update Resume" : "Save Resume"}
            </button>

            <button
              onClick={downloadPDF}
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              Download PDF
            </button>

          </div>

        </div>

        {/* Preview Section */}
        <div
          ref={resumeRef}
          className="p-8 rounded-2xl"
          style={{ backgroundColor: "white" }}
        >

          <h1
            className="text-3xl font-bold mb-6 pb-4"
            style={{
              borderBottom: "1px solid #d1d5db",
            }}
          >
            Resume Preview
          </h1>

          <div className="mb-6">

            <h2 className="text-4xl font-bold">
              {fullName || "Your Name"}
            </h2>

            <p
              className="mt-2"
              style={{ color: "#4b5563" }}
            >
              {email || "your@email.com"}
            </p>

          </div>

          <div className="mb-6">

            <h3 className="text-2xl font-semibold mb-2">
              Skills
            </h3>

            <p
              className="whitespace-pre-line"
              style={{ color: "#374151" }}
            >
              {skills || "Your skills will appear here"}
            </p>

          </div>

          <div className="mb-6">

            <h3 className="text-2xl font-semibold mb-2">
              Education
            </h3>

            <p
              className="whitespace-pre-line"
              style={{ color: "#374151" }}
            >
              {education || "Your education will appear here"}
            </p>

          </div>

          <div>

            <h3 className="text-2xl font-semibold mb-2">
              Experience
            </h3>

            <p
              className="whitespace-pre-line"
              style={{ color: "#374151" }}
            >
              {experience || "Your experience will appear here"}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ResumeForm;