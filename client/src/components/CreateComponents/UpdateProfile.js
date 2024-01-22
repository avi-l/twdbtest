import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { editProfile } from "../../services/apiService";

const UpdateProfile = (props) => {
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    profileId: props.match.params.id,
    name: props.location.state.editName,
    bio: props.location.state.editProfile,
    location: props.location.state.editLocation,
    birthdate: props.location.state.editBirthdate,
    website: props.location.state.editWebsite,
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { profileId, name, bio, location, birthdate, website } = formData;
    const profile = { profileId, name, bio, location, birthdate, website };
    await editProfile(profileId, profile);
    setUpdated(true);
  };

  useEffect(() => {
    setFormData({
      ...formData,
      name: props.location.state.editName,
      bio: props.location.state.editProfile,
      location: props.location.state.editLocation,
      birthdate: props.location.state.editBirthdate,
      website: props.location.state.editWebsite,
    });
  }, [props.location.state]);

  if (updated) {
    return (
      <Redirect
        to={`/dashboard/user/${props.match.params.name}/${formData.profileId}`}
      />
    );
  }
  return (
    <div className="container mx-auto p-4 bg-blue-50 border border-gray-500 rounded-lg">
      <form
        className="max-w-md mx-auto"
        onChange={handleUpdate}
        onSubmit={handleSubmit}
      >
        <label className="flex items-center justify-center text-2xl text-blue-500 font-bold mb-4" htmlFor="bio">Edit Profile</label>
        <textarea
          className="w-full h-20 p-2 border rounded mb-4"
          name="bio"
          value={formData.bio}
          placeholder="bio"
        />
        <input
        className="w-full p-2 border rounded mb-4"
          name="location"
          type="text"
          value={formData.location}
          placeholder="location"
        />
        <input
        className="w-full p-2 border rounded mb-4"
          name="website"
          type="text"
          value={formData.website}
          placeholder="website"
        />
        <label className="block text-sm font-semibold mb-1" htmlFor="birthdate">Date of Birth</label>
        <input className="w-full p-2 border rounded mb-4" name="birthdate" type="date" value={formData.birthdate} />
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
