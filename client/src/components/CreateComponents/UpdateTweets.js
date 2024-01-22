import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { editTweet } from "../../services/apiService";

const UpdateTweets = (props) => {
  const [tweetId] = useState(props.match.params.id);
  const [updated, setUpdated] = useState(false);
  const [tweet, setTweet] = useState(props.location.state.editTweet);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setTweet(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tweets = { tweet };
    await editTweet(tweetId, tweets);
    setUpdated(true);
  };

  if (updated) {
    return (
      <Redirect to={`/dashboard/user/${props.user.name}/${props.user.id}`} />
    );
  }
  return (
    <div className="container mx-auto p-4 bg-blue-50 border border-gray-500 rounded-lg">
      <form className="max-w-md mx-auto" onChange={handleUpdate} onSubmit={handleSubmit}>
        <label className="flex items-center justify-center text-2xl text-blue-500 font-bold mb-4" htmlFor="tweet">Edit Tweet</label>
        <textarea className="w-full h-20 p-2 border rounded mb-4" name="tweet" defaultValue={tweet}></textarea>
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
      </form>
    </div>
  );
};

export default UpdateTweets;
