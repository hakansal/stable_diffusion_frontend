import React, { useState } from "react";
import "./giris.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Giris = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const backendurl = "http://localhost:3001/userapp/giris";
  const data = {
    email: email,
    password: password,
  };
  const forgot=()=>{
       setTimeout(() => {
          navigate("/unuttum"); 
        }, 500);
  }

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendurl, data);

      if (response && response.data.token) {
        localStorage.setItem("token", response.data.token);  
        window.dispatchEvent(new Event("storage"));  

        setTimeout(() => {
          navigate("/anasayfa"); 
        }, 1000);

        alert("Giriş başarılı");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Kullanıcı bulunamadı");
      } else if (error.response && error.response.status === 402) {
        alert("Şifre hatalı");
      } else {
        console.log(error);
        alert("Hata oluştu");
      }
    }
  };

  return (
     <div className="giris_main">
      <div className="giris_container">
      <form className="giris_form" onSubmit={handlelogin}>
        <h2 className="h2">Giriş</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Giriş</button>
      </form>
      <button onClick={forgot} className="forgotbutton">şifremi unuttum</button>
    </div>
     </div>
  );
};

export default Giris;
