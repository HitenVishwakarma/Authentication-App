import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      enteredEmail: "",
      emailIsValid: true,
      enteredPassword: "",
      passwordIsValid: true,
      formIsValid: false,
    }
  );

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setState({
        formIsValid:
          state.enteredEmail.includes("@") &&
          state.enteredPassword.trim().length > 6,
      });
      validateEmailHandler();
      validatePasswordHandler();
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [state.enteredEmail, state.enteredPassword]);

  const emailChangeHandler = (event) => {
    setState({ enteredEmail: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setState({ enteredPassword: event.target.value });
  };

  const validateEmailHandler = () => {
    setState({ emailIsValid: state.enteredEmail.includes("@") });
  };

  const validatePasswordHandler = () => {
    setState({ passwordIsValid: state.enteredPassword.trim().length > 6 });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.enteredEmail, state.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!state.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
