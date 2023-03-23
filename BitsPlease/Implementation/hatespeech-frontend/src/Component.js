import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from './logo.svg';
// import { Button, TextField } from "@material-ui/core";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000", // replace with your base URL
});

const MyComponent = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async () => {
    try {
      if (inputText !== "") {
        const response = await api.post("/api/input", { text: inputText });
        setResponseText(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    if (event.target.value === "") {
      document.body.style.backgroundColor = "white";
      setResponseText(null);
    }
  };

  useEffect(() => {
    if (responseText && responseText === "Hate Speech") {
      document.body.style.backgroundColor = "red";
    } else if (responseText && responseText === "Non-Hate Speech") {
      document.body.style.backgroundColor = "green";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [responseText]);

  return (
    <div>
      <div className="d-inline-flex align-items-center">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img id="logo" src={logo}  alt={logo}/>
        <h2>BitsPlease</h2>
      </div>
      <h2 className="d-flex justify-content-center"
        id="HeaderText">
        Let's Prevent Spreading Hate Speech
      </h2>
      <div className="d-flex justify-content-center">
        <div className="form-floating w-25 input-group rounded">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter Text...."
            onChange={handleInputChange}
          />
          <label form="floatingInput" >Type Here...</label>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      {responseText ? (
        <p id="marginAdder" className="d-flex justify-content-center">
          {responseText}
        </p>
      ) : null}
    </div>
  );
};

export default MyComponent;
