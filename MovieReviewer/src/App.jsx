import { useState } from "react";
import Navbar from "./Header/Navbar/Navbar";
import Body from "./Body/ReviewBody";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PlaceHolder from "./Profile/PlaceHolder";
import ProfilePage from "./Profile/ProfilePage";
import ReviewBody from "./Body/ReviewBody";
import EditProfile from "./Profile/EditProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ReviewBody />} />
        <Route path="/profile/:username/edit" element={<EditProfile />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
