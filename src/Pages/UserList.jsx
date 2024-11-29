import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TriangleLoader } from "../Components/TriangleLoader";

const UserList = () => {
  const navigate = useNavigate();

  //State Managements
  const [pageNumber, setPageNumber] = useState(1);
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  //Page Navigations
  const onClickLeftArrow = () => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => prevState - 1);
    } else {
      alert("You reached the end of result");
    }
  };

  const onClickRightArrow = () => {
    if (pageNumber < 2) {
      setPageNumber((prevState) => prevState + 1);
    } else {
      alert("You reached the end of result");
    }
  };


  //Click on Edit Button Function
  const onClickEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  //Click on Delete Button Function
  const onHandleDelete = async (id) => {
    setIsLoading(true);
    await Axios.delete(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        console.log(response);
        const updatedUserList = usersList.filter((user) => user.id !== id);
        setUsersList(updatedUserList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await Axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
        .then((response) => {
          const fetchedUsersList = response.data.data;
          const modifiedUsersList = fetchedUsersList.map((eachUser) => ({
            id: eachUser.id,
            avatar: eachUser.avatar,
            firstName: eachUser.first_name,
            lastName: eachUser.last_name,
            email: eachUser.email,
          }));
          setUsersList(modifiedUsersList);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [pageNumber]);

  return (
    <div className="font-[Gabarito] h-screen bg-slate-100 flex flex-col items-center justify-center">
      {isLoading ? (
        <TriangleLoader />
      ) : (
        <div className="bg-white rounded-md border-2 border-slate-100 shadow-sm p-5 w-[95%] md:w-[75%] lg:w-[50%] h-[80%] flex flex-col gap-2 overflow-y-auto list-none">
          {usersList.map((eachUser) => (
            <li
              key={eachUser.id}
              className="shadow-md bg-slate-50 h-auto py-3 px-5 rounded-md"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3 md:gap-4">
                  <img
                    className="w-12 md:w-16 rounded-full"
                    src={eachUser.avatar}
                    alt={eachUser.firstName + " " + eachUser.lastName}
                  />
                  <div className="flex flex-col items-start">
                    <div className="flex flex-row items-center gap-1 text-black text-sm md:text-base">
                      <p>{eachUser.firstName}</p>
                      <p>{eachUser.lastName}</p>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base">
                      {eachUser.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <button
                    onClick={() => onClickEdit(eachUser.id)}
                    className="hidden md:block hover:bg-green-500 bg-green-400 py-1 px-4 rounded-3xl"
                  >
                    Edit
                  </button>
                  <button className="block md:hidden hover:bg-green-500 bg-green-400 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => onHandleDelete(eachUser.id)}
                    className="hidden md:block hover:bg-red-500 bg-red-400 py-1 px-4 rounded-3xl"
                  >
                    Delete
                  </button>
                  <button className="block md:hidden hover:bg-red-500 bg-red-400 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
      <div className="mt-5 flex flex-row items-center border border-slate-200 rounded-sm shadow-md">
        <button
          onClick={onClickLeftArrow}
          className="bg-white hover:bg-slate-100 py-2 px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span className="bg-slate-100 py-1 px-3">{pageNumber}</span>
        <button
          onClick={onClickRightArrow}
          className="bg-white hover:bg-slate-100 py-2 px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserList;
