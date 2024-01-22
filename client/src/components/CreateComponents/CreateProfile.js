import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createProfile } from "../../services/apiService";

const CreateProfile = (props) => {
  const [profileData, setProfileData] = useState({
    created: false,
    bio: "",
    location: "",
    website: "",
    birthdate: "",
    userId: props.user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, bio, location, website, birthdate } = profileData;
    const profile = { userId, bio, location, website, birthdate };
    await createProfile(profile);
    setProfileData((prevData) => ({ ...prevData, created: true }));
  };

  if (profileData.created) {
    return (
      // <Redirect to={`/dashboard/user/${props.user.name}/${props.user.id}`} />
      <Redirect to={`/dashboard/user/upload`} />
    );
  }

  return (
    <div className="container mx-auto p-4 bg-blue-50 border border-gray-500 rounded-lg">
      <h2 className="flex items-center justify-center text-2xl text-blue-500 font-bold mb-4">Get Started</h2>
      <form className="max-w-md mx-auto" onChange={handleChange} onSubmit={handleSubmit}>
        <textarea
          className="w-full h-20 p-2 border rounded mb-4"
          name="bio"
          type="text"
          placeholder="Bio"
          required
        />
        <input className="w-full p-2 border rounded mb-4" name="location" type="text" placeholder="Location" />
        <input className="w-full p-2 border rounded mb-4" name="website" type="text" placeholder="Website" />
        <label className="block text-sm font-semibold mb-1"  htmlFor="birthdate">
          Date of Birth
        </label>
        <input className="w-full p-2 border rounded mb-4" name="birthdate" type="date" required />
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateProfile;
