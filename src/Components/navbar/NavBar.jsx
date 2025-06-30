import React, { useState, useEffect } from "react";
import "./navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./Haznedar.png"

const NavBar = () => {
  const [Userbutton, setUserButton] = useState(false);
  const [Loginbutton, setLoginButton] = useState(true);
  const [Logoutbutton, setLogoutButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const backendurl = "http://localhost:3001/userapp/cikis";
  const navigate = useNavigate();

  const userlogout = async () => {
    try {
      const response = await axios.get(backendurl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setTimeout(() => {
          navigate("/anasayfa");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert("hata ");
      }
    }
  };

  const logout = () => {
    userlogout();
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  };

  const updateButtons = () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setUserButton(false);
      setLoginButton(true);
      setLogoutButton(false);
    } else {
      setUserButton(true);
      setLoginButton(false);
      setLogoutButton(true);
    }
  };

  useEffect(() => {
    updateButtons();
    const handleStorageChange = () => updateButtons();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="main_navbar">
      
    <div className="navbar">
      <a href="anasayfa">
        <div className="logo_main">
          <div className="navbar_logo">
            <img src={image}></img>
          </div>
          <div className="logo">Stable AI</div>

        </div>
      </a>

      {/* Menü ikonu (küçük ekranlarda gözükecek) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`navbar_buttons ${menuOpen ? "open" : ""}`}>
        <a href="/anasayfa">
          <button className="navbar_button">Anasayfa</button>
        </a>
        {Loginbutton && (
          <>
            <a href="/kayit">
              <button className="navbar_button">Kayıt</button>
            </a>
            <a href="/giris">
              <button className="navbar_button">Giriş</button>
            </a>
          </>
        )}
        <a href="/hakkimizda">
          <button className="navbar_button">Hakkımızda</button>
        </a>
        {Logoutbutton && (
          <>
            <a href="/abone">
              <button className="navbar_button">Abone Ol</button>
            </a>
            <a href="/deneme">
              <button className="navbar_button">Çizim</button>
            </a>
          </>
        )}
        {Userbutton && (
          <>
            <a href="/pics">
              <button className="navbar_button">Çizimler</button>
            </a>
            <a href="/hesabım">
              <button className="navbar_button">👨🏻‍💼</button>
            </a>
          </>
        )}
        {Logoutbutton && (
          <a href="/anasayfa">
            <button onClick={logout} className="navbar_button">
              Çıkış Yap
            </button>
          </a>
        )}
      </div>
    </div>

    </div>  );
};

export default NavBar;
