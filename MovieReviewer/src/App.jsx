import { useState } from "react";
import Navbar from "./Header/Navbar/Navbar";
import Body from "./Body/ReviewBody";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PlaceHolder from "./Profile/PlaceHolder";
import ProfilePage from "./Profile/ProfilePage";
import ReviewBody from "./Body/ReviewBody";
import EditProfile from "./Profile/EditProfile";
import PersonPage from "./Person/PersonPage";
import AddPerson from "./Person/AddPerson";
import EditPerson from "./Person/EditPerson";
import Movie from "./Movie/Movie";
import AddMovie from "./Movie/AddMovie";
import EditMovie from "./Movie/EditMovie";
import Register from "./Profile/Register";
import Login from "./Profile/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ReviewBody />} />
        <Route path="/profile/:username/edit" element={<EditProfile />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route path="/person/:id/edit" element={<EditPerson />} />
        <Route path="/person/add" element={<AddPerson />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/movie/add" element={<AddMovie />} />
        <Route path="/movie/:id/edit" element={<EditMovie />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
