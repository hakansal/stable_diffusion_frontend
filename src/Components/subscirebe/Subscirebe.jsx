import React from "react";
import "./subs.scss"
import axios from "axios";
const Subscribe = () => {

  const backendurl =  process.env.REACT_APP_SUBS_BACKEND_URL;
  const backendurl_giris=process.env.REACT_APP_SUBS_POPUP_URL;
  const pop_up = () => {
    const token = localStorage.getItem("token");

    const popup = window.open(
      `${backendurl_giris}${token}`,
      'Hesap Doğrulama',
      'width=500,height=600'
    );

    window.addEventListener("message", async (event) => {

      if (event.data === "faild") {
        alert("Üyelik doğrulanamadı!");
      }
      if (event.data === "succsess") {
        alert("üyelik doğrulandı")
        await abonelik();
      }
      else {
        alert("Üyelik doğrulanamadı.");
      }
    }, { once: true });
  };

  const abonelik = () => {
    try {

      const respone = axios(backendurl, {
        headers: {
          Authorization: `Bearer${localStorage.getItem("token")}`
        }
      })
    } catch (error) {
           alert(error)
    }
  }

  return <div className="subs_main">

    <div className="subs_container">

      <div className="subs_info">
        <h1> abone olabilmeniz için patreondan üyeliğimize abone olmalısınız </h1>
        <br></br>
        <span>  patreon'dan bize destek olduğunuzda 30 günlük sınırsız kullanım hakkına sahip olacaksınız.</span>
      </div>

      <div className="subs_form">

        <label> aboneliğiniz patreon ile eşleyin</label>
        <button onClick={pop_up}>eşle</button>

      </div>

    </div>


  </div>


}

export default Subscribe;