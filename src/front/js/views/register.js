import React, { useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import "/workspaces/Authentication-tbk/src/front/styles/register.css"

export const RegisterForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
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

  };

  return (
    <div className="container register-body">

      <form method="POST" onSubmit={handleRegister} className="register-form  centered-form">
        <h2 className="form-title">Register</h2>
        <div>
          <label className="form-label">Email:</label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <a className='float-start mt-3 text-decoration-none' href='/'>Or go back to Login</a>
      </form>
    </div>
  );
}