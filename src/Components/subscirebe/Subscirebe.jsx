import React from "react";
import "./subs.scss"
import axios from "axios";
const Subscribe = () => {

  const backendurl = "http://localhost:3001/userapp/abonelik"

  const pop_up = () => {
    const token = localStorage.getItem("token");

    const popup = window.open(
      `http://localhost:3001/userapp/patreon/giris?token=${token}`,
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
        <p> gerisi otamatik zaten ordan sonrası bizde</p>
      </div>

      <div className="subs_form">

        <label> aboneliğiniz patreon ile eşleyin</label>
        <button onClick={pop_up}>eşle</button>

      </div>

    </div>


  </div>


}

export default Subscribe;