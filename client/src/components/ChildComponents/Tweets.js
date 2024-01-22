import React, { useState, useEffect } from "react";
import { getAllTweets, deleteTweet } from "../../services/apiService";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import CreateTweets from "../CreateComponents/CreateTweets";
import Modal from "react-modal";
import DefaultProfilePicture from "./DefaultImage/defaultprofilepicture.png";
Modal.setAppElement('#root');

const Tweets = (props) => {
  const [tweets, setTweets] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [tweetToDelete, setTweetToDelete] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const tweetsData = await getAllTweets();
        setTweets(tweetsData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchTweets();
  }, [tweets]);

  const openDeleteModal = (id) => {
    setTweetToDelete(id);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setTweetToDelete(null);
    setDeleteModalIsOpen(false);
  };
  
  const handleDelete = async () => {
    if (tweetToDelete) {
      const updatedTweets = tweets.filter((tweet) => tweet.id !== tweetToDelete);
      setTweets(updatedTweets);
      await deleteTweet(tweetToDelete);
      closeDeleteModal();
    }
  };

  const renderTweets = () => {
    const sortTweets = tweets.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sortTweets.map((tweet) => {
      return (
        <div className="mx-auto" key={tweet.id}>
          <div
            className="bg-white border border-gray-300 p-4 rounded mb-4 relative">
            <div className="flex items-start">
            {tweet.user && tweet.user.image && tweet.user.image.image && tweet.user.image.image.url ? (
              <img className="rounded-lg w-20 h-auto" src={tweet.user.image.image.url} alt="" />
            ) : (
              <img className="rounded-lg w-20 h-auto" src={DefaultProfilePicture} alt="Default" />
            )}
            <div className="ml-4 flex-grow">
              <Link
                to={
                  tweet.user !== null
                    ? {
                        pathname: `/dashboard/user/${tweet.user.name}/${tweet.user.id}`,
                        state: { names: tweet.user.name },
                      }
                    : "/"
                }
                className="text-dark font-bold"
              >
                {" "}
                {tweet.user !== null ? tweet.user.name : "Anonymous"}
              </Link>
              <div className="font-normal">{tweet.tweet}</div>
              </div>
              <div className="text-secondary text-right">
              <p className="text-secondary font-normal">
                {dateFormat(tweet.createdAt, "mmm dd, yyyy")}
              </p>
              </div>
            </div>
            {localStorage.getItem("userId") == tweet.userId ? (
              <div className="absolute bottom-0 right-0 mb-2 mr-2">
                <Link
                  to={{
                    pathname: `/dashboard/tweet/${tweet.id}/update`,
                    state: { editTweet: tweet.tweet },
                  }}
                  className="text-blue-500 cursor-pointer mr-2"
                >
                  Edit
                </Link>
                <button onClick={() => openDeleteModal(tweet.id)}>
                  <span className="text-red-500 cursor-pointer">
                    Delete
                  </span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="tweet-data">
      <CreateTweets {...props} />
      <div>{renderTweets()}</div>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        overlayClassName="modal-overlay fixed inset-0 bg-black opacity-80"
        className="modal-container mx-auto my-32 bg-white p-4 rounded w-64"
      >
        <h2 className="text-lg font-bold mb-2">Are you sure you want to delete this tweet?</h2>
        <div className="flex justify-end">
          <button className="mr-2 text-blue-500 cursor-pointer" onClick={handleDelete}>
            Yes, delete
          </button>
          <button className="text-gray-500 cursor-pointer" onClick={closeDeleteModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Tweets;
