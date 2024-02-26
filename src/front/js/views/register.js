import React, { useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";

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
    <form method="POST" onSubmit={handleRegister}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}