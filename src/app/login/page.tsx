"use client";
import React, { useState, ChangeEvent, FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./login.scss";
import Header from "../../../components/Header/header";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const doLogin = () => {
    fetch("http://192.168.1.111:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.message === "Login success!") {
          console.log(user);
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("email", user.email);
          localStorage.setItem("nickname", user.nickname);
          localStorage.setItem("id", user.id);
          // localStorage.setItem("password", data.password);
          router.push("/");
        } else {
          alert("로그인에 실패했습니다 다시 시도해 주세요");
        }
      });
  };
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
            onChange={handleEmail}
          />

          <p> 비밀번호 입력: </p>
          <input
            className="mainInput"
            type="password"
            placeholder="당신의 비밀번호 를 입력하세요"
            onChange={handlePw}
          />

          <button onClick={doLogin}>로그인</button>
          <div className="loginBottom">
            <p className="bottomText">또는</p>
            <Link href="/signup">
              <button type="button" className="bottomButton">
                - 회원가입 -
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
