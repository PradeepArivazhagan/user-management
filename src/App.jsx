import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import UserList from "./Pages/UserList";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Edit from "./Pages/Edit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/userslist" element={<UserList />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/edit-user/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
