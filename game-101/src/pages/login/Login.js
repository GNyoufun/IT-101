import "./Login.css";
import { GameLogo, LoginBar, Title } from "../../components";

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
