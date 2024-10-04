/* eslint-disable react/jsx-no-undef */
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Taskbar from "./Components/Taskbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Editerbox from "./Components/Editerbox";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Taskbar />} />
          <Route path="/edit" element={<Editerbox />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
