import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

const linkStyle = {
  marginRight: 15
};

export default function Nav() {

  const [logout, setLogout] = useState(false)

  const handleClick = () => {
    localStorage.setItem("jwt", null);
    localStorage.setItem("data", null);
    setLogout(true);
  }

  return (
    <div>
      <Link href="/homepage">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/profile">
        <a style={linkStyle}>Profile</a>
      </Link>
      <div>
        <label>Search</label>
        <input type="text" />
      </div>
      <h4 onClick={handleClick}>logout</h4>
      {logout ? Router.push("/login") : null}
    </div>
  );
};



