"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./header.scss";

const Header: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = !!localStorage.getItem("token");
  const name = localStorage.getItem("nickname") || "";

  const handleLogout = () => {
    const isLogoutConfirmed = window.confirm("로그아웃 하시겠습니까?");

    if (isLogoutConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("nickname");

      router.push("/");
    }
  };

  return (
    <div className="nav">
      <div className="wrapper">
        <div>
          <img
            className="logo"
            alt="logoimg"
            src="/img/gitcat.png"
            onClick={() => router.push("/")}
          />
        </div>

        <ul className="headerText">
          {isLoggedIn ? (
            <>
              <li>
                <p>{name} 님</p>
              </li>
              <li>
                <button className="link" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
              <li>
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
