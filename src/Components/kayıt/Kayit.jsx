import React, { useState } from "react";
import "./kayit.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Kayit = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const backendurl = "http://localhost:3001/userapp/kayit"
  const data = {
    email: email,
    username: username,
    password: password
  };

  const handelsign = async (e) => {
    e.preventDefault();
    

    try {
      await axios.post(backendurl, data);
      alert("Kayıt başarılı!");
      setEmail( "");
      setPassword( "");
      setUsername("");
      setTimeout(() => {
        navigate("/giris"); 
      }, 500);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 411) {
          alert("bu email kayıtlı");
        } else if (error.response.status === 410) {
          alert("lütfen tüm değerleri doldurun");
        } else {
          alert("Kayıt başarısız! Hata kodu: " + error.response.status);
        }
      } else {

        alert("Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.");
        console.error("Sunucu hatası:", error);
         
      }
      console.log(error);
    }
  };

  return (
    <div className="kayit_main">
      <div className="kayit_container">
        <form className="kayit_form" onSubmit={handelsign}>
          <div>
            <h2 className="h2">Kayıt</h2>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div><label>Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /></div>

          <div>
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Gönder</button>
        </form>
        <div className="kayit_info">
          fad
        </div>
      </div>

    </div>
  );
};

export default Kayit;
