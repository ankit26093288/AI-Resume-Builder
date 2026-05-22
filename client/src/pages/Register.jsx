import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {

    const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleRegister = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    console.log(response.data);

    alert("Registration Successful");

    navigate("/");

  } catch (error) {

    console.log(error);

    alert("Registration Failed");

  }

};
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

       <input
  type="text"
  placeholder="Enter Name"
  className="w-full p-3 border rounded-lg mb-4"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="email"
  placeholder="Enter Email"
  className="w-full p-3 border rounded-lg mb-4"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Enter Password"
  className="w-full p-3 border rounded-lg mb-4"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
       <button
  onClick={handleRegister}
  className="w-full bg-green-500 text-white p-3 rounded-lg"
>
  Register
</button>

<p className="text-center mt-4">
  Already have an account?

  <Link
    to="/"
    className="text-blue-500 ml-2"
  >
    Login
  </Link>

</p>

      </div>

    </div>
  );
}

export default Register;