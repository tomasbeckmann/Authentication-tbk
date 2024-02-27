import React, { useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import "/workspaces/Authentication-tbk/src/front/styles/register.css"

export const RegisterForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const { actions } = useContext(Context)

  const handleRegister = async (event) => {

    event.preventDefault();

    const inputData = Object.fromEntries(new FormData(event.target));
    console.log(Object.fromEntries(new FormData(event.target)));
    actions.fetchRegister(inputData);
    alert("Account created!");
    clearForm();

  };

  return (
    <form method="POST" onSubmit={handleRegister} className="register-form">
    <div className="form-group">
      <label htmlFor="email" className="form-label">Email:</label>
      <input
        type="text"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
        className="form-control"
      />
      {errors.email && <p className="error">{errors.email}</p>}
    </div>
    <div className="form-group">
      <label htmlFor="password" className="form-label">Password:</label>
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleInputChange}
        className="form-control"
      />
      {errors.password && <p className="error">{errors.password}</p>}
    </div>
    <div className="form-group">
      <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleInputChange}
        className="form-control"
      />
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}
    </div>
    <button type="submit" className="btn btn-primary">Register</button>
  </form>
  );
}