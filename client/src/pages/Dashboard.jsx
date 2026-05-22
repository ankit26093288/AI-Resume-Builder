import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          AI Resume Builder
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Content */}
      <div className="p-10">

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-4">
            Welcome to Dashboard
          </h2>

          <p className="text-gray-600 mb-6">
            Build professional AI resumes easily.
          </p>

          <button
  onClick={() => navigate("/resume")}
  className="bg-blue-500 text-white px-6 py-3 rounded-lg"
>
  Create Resume
</button>
<button
  onClick={() => navigate("/my-resumes")}
  className="bg-green-500 text-white px-6 py-3 rounded-lg ml-4"
>
  My Resumes
</button>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;