import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImages } from '../../services/apiService'

const UserImage = ({ id, name }) => {
  const [image, setImage] = useState([]);
  const [userId] = useState(id);

  const getImage = async () => {
    const images = await getImages();
    setImage(images);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getImage();
    };
    fetchData();
  }, []);

  const renderImage = () => {
    const userImages = image.find(poster => poster.userId == userId);
    if (!userImages) {
      return (
        <div key={userId}>
           <img src="https://cdn.vectorstock.com/i/preview-1x/13/04/male-profile-picture-vector-2041304.jpg" alt="Default" />
        </div>
      );
    } else {
        return (
        <div key={userImages.id}>
          <img src={userImages.image.url} alt={`User ${name}'s Image`} />

          {localStorage.getItem('userId') === userId ? (
            <Link
              to={{pathname: `/user/upload/${name}/${userId}/edit`}}
              onClick={() => localStorage.setItem('imageId', userImages.id)}
            >
              <button>Edit Image</button>
            </Link>
          ) : (
            ''
          )}
        </div>
        );
    }
  };

  return <div>{renderImage()}</div>;
}

export default UserImage