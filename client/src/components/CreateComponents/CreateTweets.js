import React, { useEffect, useState } from "react";
import { postTweet } from "../../services/apiService";

const CreateTweets = (props) => {
  const [tweet, setTweet] = useState("");
  const userId = props.user.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tweet") {
      setTweet(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tweets = { userId, tweet };
    await postTweet(tweets);
    setTweet("");
  };
  const handleKeyPress = (e) => {
    return e.key === "Enter" ? handleSubmit(e) : "";
  };

  return (
    <div className="container mx-auto">
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <textarea
          className="w-full"
          type="text"
          name="tweet"
          value={tweet}
          placeholder="Whats happening?"
          onKeyPress={handleKeyPress}
          onChange={handleChange} 
        ></textarea>
        <br />
        <div className="flex justify-end">
          <button className="btn btn-primary mb-2 font-weight-bold">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTweets;
