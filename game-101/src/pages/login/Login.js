import React from "react";

import "./Login.css";

import Title from "../../components/login/Title";
import GameLogo from "../../components/login/GameLogo";
import LoginBar from "../../components/login/LoginBar";

const Login = () => {
  return (
    <div>
      <div className="column">
        <div className="game-101">
          <Title />
          <GameLogo />
        </div>
      </div>
      <div className="column">
        <div className="login">
          <LoginBar />
        </div>
      </div>
    </div>
  );
};

export default Login;
