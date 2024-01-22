import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function SignUpForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);

  const handleTextInput = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;
    const { handleSignUp } = props;
    setShowError(false);

    try {
      await handleSignUp({ name, email, password });
    } catch (e) {
      setShowError(true);
    }
  };
  const { isSignedIn } = props;

  let errorMessage;

  if (showError) {
    errorMessage = (
      <div className="bg-red-500 text-white p-2 mb-4 rounded">
        <span>
          An error occurred, please ensure your credentials are correct
        </span>
      </div>
    );
  }

  if (isSignedIn) {
    return <Redirect to="/dashboard" />;
    // return <Redirect to={`/dashboard/user/${formData.name}/${props.userId}`} />;
  }

  return (
    <div className="flex flex-col items-center relative bottom-[-5pc]">
      {errorMessage}
      <form
        className="flex flex-col items-center box-border shadow-md w-96 p-12 bg-blue-100"
        onSubmit={handleSubmitForm}
      >
        <div>
          <input
            type="text"
            name="name"
            onChange={handleTextInput}
            value={formData.name.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })}
            placeholder="name"
            className="bg-blue-300 w-72 p-2 mb-4"
          />
        </div>

        <div>
          <input
            type="text"
            name="email"
            onChange={handleTextInput}
            value={formData.email}
            placeholder="email"
            className="bg-blue-300 w-72 p-2 mb-4"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            onChange={handleTextInput}
            value={formData.password}
            placeholder="password"
            className="bg-blue-300 w-72 p-2 mb-4"
          />
        </div>

        <button className="bg-blue-500 w-72 p-2 text-white font-bold rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
