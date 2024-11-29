import { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import Cookies from "js-cookie";
import LoginLoader from "../Components/LoginLoader";

const Login = () => {
  const navigate = useNavigate();

  //State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  //User Interaction Functions
  const onTypeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onTypePassword = (event) => {
    setPassword(event.target.value);
  };


  //Handle Login Event
  const onHandleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    Axios.post(`https://reqres.in/api/login`, {
      email,
      password,
    })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          const jwtToken = response.data.token;
          Cookies.set("jwttoken", jwtToken, { expires: 30 });
          navigate("/userslist");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setIsError(false);
          setErrorMessage("");
        }, 3000);
      });
  };
  return (
    <div className="font-[Gabarito] h-screen bg-slate-100 flex flex-col items-center justify-center">
      <form
        onSubmit={onHandleLogin}
        className="bg-white w-80 p-8 rounded-md shadow-md flex flex-col"
      >
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          onChange={onTypeEmail}
          value={email}
          id="email"
          type="email"
          placeholder="Enter Your Email"
          required={true}
          className="bg-slate-200 rounded-sm mt-1 py-2 px-4 focus:outline-none"
        />
        <label htmlFor="password" className="text-lg mt-4">
          Password
        </label>
        <input
          onChange={onTypePassword}
          value={password}
          id="password"
          type="password"
          placeholder="Enter Your Password"
          required={true}
          className="bg-slate-200 rounded-sm mt-1 py-2 px-4 focus:outline-none"
        />
        {isError && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}
        <button
          onSubmit={onHandleLogin}
          type="submit"
          className="w-28 mt-4 py-2 px-6 bg-blue-700 hover:bg-blue-600 text-white rounded-md mx-auto flex flex-col items-center justify-center"
        >
          {isLoading ? <LoginLoader /> : <span>Login</span>}
        </button>
      </form>
    </div>
  );
};

export default Login;
