import React from "react";
import { useParams } from "react-router-dom";
import "./sign-up.css";
import endpointUrl from "../../config";
export default () => {
  let { token } = useParams();

  const [user, setUser] = React.useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = e => {
    const sendUserDetails = { ...user };
    delete sendUserDetails.confirmPassword;
    fetch(`${endpointUrl}/sign-up/${token}`, {
      method: "POST",
      body: JSON.stringify({ user: sendUserDetails }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 302) {
        window.location = "/";
      }
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };
  return (
    <div className="sign-up-form-container">
      <h1>sign up page</h1>

      <div className="sign-up-form">
        <input
          type="text"
          placeholder="Enter firstName..."
          value={user.firstName}
          name="firstName"
          onChange={handleChange}
          required
          minLength="3"
        />
        <input
          type="text"
          placeholder="Enter surname..."
          value={user.surname}
          name="surname"
          onChange={handleChange}
          required
          minLength="3"
        />

        <input
          type="email"
          placeholder="Enter email..."
          value={user.email}
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter password..."
          value={user.password}
          name="password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="confirm password..."
          value={user.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          required
        />

        <div className="createbtnContainer">
          <button onClick={handleSubmit} type="submit">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};