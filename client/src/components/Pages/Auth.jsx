import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = ({ isRegistering }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const url = isRegistering ? "/auth/register" : "/auth/login";
      const { data } = await axiosInstance.post(url, formData);

      localStorage.setItem("jwt", data.token);

      const userResponse = await axiosInstance.get("/auth/user");
      setAuthUser(userResponse.data.user);
      toast.success("You have successfully logged in.");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred");
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const isButtonDisabled = !formData.username || !formData.password || (isRegistering && !formData.email);

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <h3 className="text-gray-800 text-3xl font-extrabold p-3">{isRegistering ? "Register" : "Login"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Username</label>
                  <input name="username" type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter Username" onChange={handleChange} required />
                </div>
                {isRegistering && (
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">Email</label>
                    <input name="email" type="email" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" onChange={handleChange} required />
                  </div>
                )}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input name="password" type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" onChange={handleChange} required />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="!mt-12">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" disabled={isButtonDisabled}>
                  {isRegistering ? "Create an account" : "Login"}
                </button>
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">
                {isRegistering ? "Already have an account? " : "Don't have an account? "}
                <a href={isRegistering ? "/login" : "/register"} className="text-blue-600 font-semibold hover:underline ml-1">
                  {isRegistering ? "Login here" : "Register here"}
                </a>
              </p>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img src="https://readymadeui.com/login-image.webp" className="w-full h-full max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
