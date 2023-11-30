import "./signup.scss";
import Header from "../../../components/Header/header";

const Signup: React.FC = () => {
  return (
    <>
      <Header />
      <div className="signupContainer">
        <div className="signupIntro">
          <h1 className="introHeader">
            지금 회원가입 하시고 횟수 제한 없는
            <span className="introHeaderSpan"> 본인만의 URL </span>을
            생성해보세요.
          </h1>
        </div>

        <div className="signupMain">
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

          <p> 닉네임 입력: </p>
          <input
            className="mainInput"
            type="text"
            placeholder="당신의 닉네임 을 입력하세요"
          />
          <div className="check">
            <div className="checkLists">
              <img alt="img" src="/img/check.png" />
              <p> 이메일은 @를 포함하는 올바른 이메일 형식이어야 합니다.</p>
            </div>
            <div className="checkLists">
              <img alt="img" src="/img/check.png" />
              <p> 비밀번호는 최소 8자리 이상 으로 기입 해주셔야 합니다.</p>
            </div>
            <div className="checkLists">
              <img alt="img" src="/img/check.png" />
              <p> 닉네임은 영어 및 한글 모두 입력 가능합니다.</p>
            </div>
          </div>
          <button>가입하기</button>
        </div>
      </div>
    </>
  );
};
export default Signup;
