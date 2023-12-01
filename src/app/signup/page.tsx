"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import "./signup.scss";
import Header from "../../../components/Header/header";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const doFetch = () => {
    fetch("http://192.168.1.67:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        nickname: nickname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Signup success!") {
          alert("회원가입이 성공했습니다");
          router.push("/");
        } else {
          alert("회원가입의 실패했습니다 다시 시도해 주세요");
        }
      });
  };

  const isInputValid =
    email.includes("@") &&
    email.includes(".") &&
    password.length >= 10 &&
    password.length <= 20 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password);

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
            onChange={handleEmail}
          />

          <p> 비밀번호 입력: </p>
          <input
            className="mainInput"
            type="password"
            placeholder="당신의 비밀번호 를 입력하세요"
            onChange={handlePassword}
          />

          <p> 닉네임 입력: </p>
          <input
            className="mainInput"
            type="text"
            placeholder="당신의 닉네임 을 입력하세요"
            onChange={handleNickname}
          />
          <div className="check">
            <div className="checkLists">
              <img alt="img" src="/img/check.png" />
              <p> 이메일은 @를 포함하는 올바른 이메일 형식이어야 합니다.</p>
            </div>
            <div className="checkLists">
              <img alt="img" src="/img/check.png" />
              <p>
                비밀번호는 최소 10자리 이상 20자리 이하, 그리고 최소 하나의
                문자, 숫자, 특수기호를 포함해야 합니다.
              </p>
            </div>
            <div className="checkLists">
              <img alt="img" src="/img/check.png" />
              <p> 닉네임은 영어 및 한글 모두 입력 가능합니다.</p>
            </div>
          </div>
          <button
            onClick={doFetch}
            className={isInputValid ? "buttonLogin" : "buttonLoginDisabled"}
            disabled={isInputValid ? false : true}
          >
            가입하기
          </button>
        </div>
      </div>
    </>
  );
};
export default Signup;
