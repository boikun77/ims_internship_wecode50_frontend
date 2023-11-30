import "./login.scss";
import Header from "../../../components/Header/header";

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <div className="loginContainer">
        <div className="loginIntro">
          <h1 className="introHeader">
            지금 로그인 하시고 무료로 제공하는
            <span className="introHeaderSpan"> 다양한 혜택들을</span>을 체험해
            보세요.
          </h1>
        </div>

        <div className="loginMain">
          <p> Email 입력: </p>
          <input
            className="mainInput"
            type="text"
            placeholder="당신의 email 을 입력하세요"
          />

          <p> 비밀번호 입력: </p>
          <input
            className="mainInput"
            type="password"
            placeholder="당신의 비밀번호 를 입력하세요"
          />

          <button>로그인</button>
          <div className="loginBottom">
            <p className="bottomText">또는</p>
            <button className="bottomButton">- 회원가입 -</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
