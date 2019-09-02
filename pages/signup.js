import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";

export default function Login()  {

  const [src, setSrc] = useState("");
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [preview, setPreview] = useState(null);
  // const [user, setUser] = userState('');

  const onClose = () => {
    setPreview(null);
  }

  const onCrop = (preview) => {
    setPreview(preview);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const location = e.target.location.value;
    const bio = e.target.bio.value;
    // const avatar = e.target.avatar.value;
    fetch("http://localhost:7777/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password: password,
        avatar:
          "https://pic1.zhimg.com/v2-fda399250493e674f2152c581490d6eb_1200x500.jpg",
        location: location,
        bio: bio
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.error != undefined) {
          setUserAlreadyExists(true);
        } else {
          localStorage.setItem("jwt", data.jwt);
          Router.push(`/homepage`);
        }
      });
  };


  return (
    <div className="signup-container">
      <div id="signup">
        {userAlreadyExists ? (
          <p className="signup-error">user name already exist</p>
        ) : null}
        <form id="signup-form" onSubmit={handleSubmit}>
          <input
            className="input-box"
            type="text"
            name="name"
            placeholder="name"
          />
          <br />
          <input
            className="input-box"
            type="password"
            name="password"
            placeholder="password"
          />
          <br />
          <input
            className="input-box"
            type="text"
            name="location"
            placeholder="location"
          />
          <br />
          <input
            className="input-box"
            type="text"
            name="bio"
            placeholder="bio"
          />
          <br />
          <input
            className="input-box"
            type="text"
            name="avatar"
            placeholder="avatar url"
          />
          <br />
          <input
            id="button"
            className="input-box"
            type="submit"
            value="Sign Up"
          />
        </form>

        <Link href="/login">
          <a>back to login?</a>
        </Link>
      </div>
    </div>
  );
}


