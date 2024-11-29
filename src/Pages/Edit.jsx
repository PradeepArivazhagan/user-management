import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TriangleLoader } from "../Components/TriangleLoader";

const Edit = () => {
  const params = useParams();
  const userID = params.id;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onEditFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const onEditLastName = (event) => {
    setLastName(event.target.value);
  };

  const onEditEmail = (event) => {
    setEmail(event.target.value);
  };

  const onHandleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await Axios.put(`https://reqres.in/api/users/${userID}`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
    })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        navigate("/userslist");
        setTimeout(() => {
          alert("User Update Successfully");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchSingleUserData = async () => {
      await Axios.get(`https://reqres.in/api/users/${userID}`)
        .then((response) => {
          const fetchUserData = response.data.data;
          setFirstName(fetchUserData.first_name);
          setLastName(fetchUserData.last_name);
          setEmail(fetchUserData.email);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchSingleUserData();
  });

  return (
    <div className="font-[Gabarito] h-screen bg-slate-100 flex flex-col items-center justify-center">
      {isLoading ? (
        <TriangleLoader />
      ) : (
        <form
          onSubmit={onHandleUpdate}
          className="bg-white w-[80%] md:w-[40%] lg:w-[22%] py-6 px-8 rounded-lg border-2 border-slate-200 flex flex-col items-start shadow-sm"
        >
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            onChange={onEditFirstName}
            value={firstName}
            type="text"
            placeholder="enter name"
            className="bg-slate-100 w-full py-2 px-4 rounded-sm focus:outline-none mt-2"
          />
          <label htmlFor="lastName" className="mt-3">
            Last Name
          </label>
          <input
            id="lastName"
            onChange={onEditLastName}
            value={lastName}
            type="text"
            placeholder="enter name"
            className="bg-slate-100 w-full py-2 px-4 rounded-sm focus:outline-none mt-2"
          />
          <label htmlFor="email" className="mt-3">
            Email ID
          </label>
          <input
            id="email"
            onChange={onEditEmail}
            value={email}
            type="email"
            placeholder="enter name"
            className="bg-slate-100 w-full py-2 px-4 rounded-sm focus:outline-none mt-2"
          />
          <p className="text-xs text-slate-400 mt-3">
            Note: Your updated cannot be visible in users list. Because we use
            the public API for Development.
          </p>
          <button
            type="submit"
            className="w-28 mt-6 py-2 px-6 bg-blue-700 hover:bg-blue-600 text-white rounded-md mx-auto flex flex-col items-center justify-center"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default Edit;
