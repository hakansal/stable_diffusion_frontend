import { useState } from "react";
import "./forgot.scss";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [backend,setbackend]=useState(false);
  const backendurl =   "http://195.174.220.164:3001/userapp/forgot";
 

  const senddata = async (e) => {
    e.preventDefault();  

    const data = { email };
     
    try {
       
      const response = await axios.post(backendurl, data);

     setbackend(true);
    } catch (error) {
      if (error.response?.status === 400) {
        alert("Emailinizi yazınız");
      } else if (error.response?.status === 402) {
        alert("Böyle bir kullanıcı yok");
      } else {
        alert("Bir hata oluştu: " + error.message);
      }
    }
  };

  return (
    <div className="main_forgot">
      <div className="container_forgot">
        <form onSubmit={senddata} className="forgot_form">
          <p>Şifrenizi sıfırlamak için lütfen email adresinizi girin</p>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <button type="submit">Sıfırla</button>
          {backend&&
        (<p>mail adresinizi kontrol edin geçici şifreniz yollandı</p>)
        }
        </form>
         
      </div>
    </div>
  );
};

export default Forgot;
