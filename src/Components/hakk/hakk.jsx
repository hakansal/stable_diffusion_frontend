import React from "react";
import "./hakk.scss"
import img1 from "./pics/ekr1.png"
import img2 from "./pics/ekr2.png"
import img3 from "./pics/ekr3.png"
const Hak = () => {


  return <div className="hakk_main">
    <div className="hakk_container">
    <div className="hakk_slider">
        <img src={img2}>
        </img>
      </div>
      <div className="info_extend">

        <div className="pp_hakk">

          <ul  >
            <li >
              <span  >

                Merhaba! 👋
                Ben bilgisayar mühendisliği mezunu bir yazılım geliştiriciyim. Stable AI, yapay zeka ve web teknolojileriyle ilgilendiğim bir dönemde geliştirmeye başladığım kişisel bir projedir.
              </span>
            </li>
            <br></br>
            <li>
              <span>
                Bu platformda, kullanıcıların yapay zekâ destekli çizimler oluşturabileceği basit ve işlevsel bir sistem kurmayı hedefledim.
              </span>
            </li>
            <br></br>
            <li>
              <span>
                Aynı zamanda giriş/çıkış, kullanıcı yönetimi, abonelik sistemi gibi tam bir web uygulamasında bulunması gereken özellikleri de bu projede denemek istedim.
              </span>
            </li>
          </ul>
        </div>

      </div>
       


    </div>
    <div className="hakk_container">
      <div className="hakk_slider">
        <img src={img3}>
        </img>
      </div>
      <div className="info_hakk">

        <div className="pp_hakk">

          <span className="span_head">  Neden Bu Projeyi Yaptım?</span>

          <ul>
            <li>
              <span>  Full stack becerilerimi geliştirmek</span>
            </li><br></br>
            <li>
              <span> React, Express.js, MongoDB ve JWT gibi teknolojileri gerçek bir projede deneyimlemek</span>
            </li><br></br>
            <li>
              <span>Yapay zekâ (özellikle Stable Diffusion) ile üretim süreçlerini daha yakından tanımak</span>
            </li>
            <br></br>
            <li><span>
              github projelerimi buradan inceleyebilirsiniz.
            </span></li>
          </ul>

          <p><a href="https://github.com/hakansal">https://github.com/hakansal</a></p>

        </div>
      </div>

    </div>
    <div className="hakk_container">

      <div className="hakk_slider">
        <img src={img1}>
        </img>
      </div>

      <div className="info_hakklast">

        <div className="pp_hakk">
          <ul>
            <li>
              <span>
                mind map ile projenin daha detaylı halini görsel olarak inceleyebilirsiniz.
              </span>
            </li>

            <a href="https://www.mindmeister.com/app/map/3659108662?source=template">https://www.mindmeister.com/app/map/3659108662?source=template</a>


          </ul>
        </div>
      </div>

    </div>

  </div>
}
export default Hak;