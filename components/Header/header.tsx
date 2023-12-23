"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./header.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const nickname = localStorage.getItem("nickname") || "";

      setIsLoggedIn(!!token);
      setName(nickname);
    }
  }, []);
  const handleLogout = () => {
    const isLogoutConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (isLogoutConfirmed) {
      localStorage.clear();
      router.push("/");
      window.location.reload(true);
    }
  };

  return (
    <div className="nav">
      <div className="wrapper">
        <div>
          <img
            className="logo"
            alt="logoimg"
            src="/img/shortendUrlLogo-removebg.png"
            onClick={() => router.push("/")}
          />
        </div>

        <ul className="headerText">
          {isLoggedIn ? (
            <>
              <li className="memberSection">
                <p>{name} 님</p>
              </li>
              <li className="memberSection">
                <button className="link" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
              <li className="memberSection">
                <button className="link" onClick={() => router.push("/mypage")}>
                  마이페이지
                </button>
              </li>
            </>
          ) : (
            <>
              <Link href="/signup">
                <button className="signup">회원가입</button>
              </Link>

              <Link href="/login">
                <button className="login">로그인</button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
