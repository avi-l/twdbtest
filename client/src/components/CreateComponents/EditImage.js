import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { api } from "../../services/apiService";
const apiRouter = api;

const EditImage = (props) => {
  const [edited, setEdited] = useState(false);
  const [file, setFile] = useState(null);
  const imageId = localStorage.getItem('imageId');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async (e) => {
    e.preventDefault(); 
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("imageId", imageId);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await apiRouter.put(`app/upload/${imageId}`, formData, config);
      setEdited(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (edited) {
    return (
      <Redirect
        to={`/dashboard/user/${props.match.params.name}/${props.match.params.id}`}
      />
    );
  }

  return (
    <div>
      <form onChange={onFileChange} onSubmit={onFileUpload}>
        <input type="file" htmlFor="file" />
        <br />
        <button className="btn btn-primary font-weight-bold rounded">
          Upload!
        </button>
      </form>
    </div>
  );
};

export default EditImage;
