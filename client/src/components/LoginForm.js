import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";

function LoginForm(props) {
  const isMounted = useRef(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cleanup function to set the mounted state to false on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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
    const { email, password } = formData;
    const { handleLogin } = props;

    setLoading(true);
    setShowError(false);

    try {
      await handleLogin({ email, password });
    } catch (e) {
      console.log(e);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const autoFillDemoUser = (event) => {
    event.preventDefault();
    setFormData({
      email: "demouser@mail.com",
      password: "password",
    });
    const form = event.target.form;
    if(form) {
      setTimeout(() => {
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      }, 0);
    }
  };

  const { isSignedIn } = props;

  if (isSignedIn) {
    return <Redirect to="/dashboard/tweets" />;
  }

  return (
    <div className="flex flex-col items-center relative bottom-[-5pc]">
      {showError && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">
            An error occurred, please ensure your credentials are correct
        </div>
      )}
      {loading && (
        <div className="bg-red-500 text-white p-2 mb-4 rounded">Please Wait</div>
      )}

      <form className="flex flex-col items-center box-border shadow-md w-96 p-12 bg-blue-100" onSubmit={handleSubmitForm}>
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

        <button className="bg-blue-500 w-72 p-2 text-white font-bold rounded mb-4">Login</button>
        <button onClick={autoFillDemoUser} className="bg-gray-500 w-72 p-2 text-white font-bold rounded">
          Login as a Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
