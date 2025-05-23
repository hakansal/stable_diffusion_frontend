import React, { useState, useEffect } from "react";
import "./deneme.scss";
import axios from "axios";

const Deneme = () => {

  const [isactive, setisative] = useState(false);
  const [userpromt, setUserpromt] = useState("");
  const [promtimage, setPromtimage] = useState(false);
  const [button, setButton] = useState(true);
  const [promturl, setPromturl] = useState("");
  const [loadingbox, setLoadingbox] = useState(false);
  const [stepvalue, setStepvalue] = useState(1);
  const [guidancescale, setGuidancescale] = useState(1);
  const [widthvalue, setWidthvalue] = useState(512);
  const [heightvalue, setHeightvalue] = useState(512);
  const [info, setİnfo] = useState(false);
  const [moved, setMoved] = useState(true);


  //giriş kontrolü
  const enteringAccount = () => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setisative(false);
    }
    if (token != null) {
      setisative(true);

    }
    else {
      setisative(false)
    }
  }
  useEffect(() => {
    enteringAccount();

    const handleStorageChange = () => {
      enteringAccount();
    }
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);

    };
  }, []);

  const backendurl = process.env.REACT_APP_DENEME_BACKEND_URL
  const backendurl_save = process.env.REACT_APP_DENEME_BACKEND_URL_SAVE
  const key = process.env.REACT_APP_DENEME_BACKEND_URL_SAVE
  const url = process.env.REACT_APP_API_URL;

  //fotoğraf parametreleri
  const imgparameters = {
    guidance_scale: parseInt(guidancescale),
    num_inference_steps: parseInt(stepvalue),
    width: parseInt(widthvalue),
    height: parseInt(heightvalue),
  };

  //fotoğrafı kayıt için backend isteği
  const picture_Save = async (blob, promt) => {

    const formData = new FormData();
    formData.append("image", blob, `genereted.png`);
    formData.append("name", `${promt}`)
    try {
      const respone = await axios.post(backendurl_save, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

    } catch (error) {

      alert(error)
    }

  }
  // kullanım kontrolu
  const uses_check=async()=>{
    

  }

  //fotoğraf için api isteeği
  const generateImage = async (prompt) => {
    try {
      const response = await axios.post(
        url,
        { inputs: prompt, ...imgparameters },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "Accept": "image/png",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "image/png" });
      const response_data = {
        url: URL.createObjectURL(blob),
        blob: blob
      }
      return response_data;
    } catch (error) {
      if (error.response && error.response.data) {
        const errorText = await new Response(error.response.data).text();
        console.error("Server error:", errorText);
      }
      console.log(error);
      alert(" fotoğraf oluşturulamadı")
      return null;
    }
  };

  //fotoğraf istek atma buton fonksiyonu
  const handlepic = async (e) => {

    e.preventDefault();
     
    try {
      const response = await axios.get(backendurl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });


    } catch (error) {
      if (error.response.status === 400) {
        alert("günlük limite ulaştınız maalesef")

      } if (error.response.status === 401) {
        setButton(false);
        setLoadingbox(true);
        setPromturl("");

        const promt_url = await generateImage(userpromt);

        if (promt_url) {

          await picture_Save(promt_url.blob, userpromt)

          setPromtimage(true);
          setPromturl(promt_url.url);

        } else {
          alert("Görsel oluşturulamadı!");
        }


        setLoadingbox(false);
        setButton(true);
        setUserpromt("");

      }

    }


  };

  return (
    <div>
      {isactive &&
        (<div className="deneme_main">

          <div className="deneme_container">
            <div className="form_container">
              <div className="gecis">
                <div
                  className={`secenekler ${moved ? "right" : "left"}`}
                  onClick={() => {
                    setMoved(!moved)
                    setPromtimage(false);
                  }
                  }
                >
                  <div className="gosterge"></div>
                  <div className={`secenek ${moved ? "active" : ""}`}>Resim</div>
                  <div className={`secenek ${!moved ? "active" : ""}`}>Video</div>
                </div>
              </div>

              {
                !moved &&
                (<form className="deneme_form">
                  <p>yakında gelecek</p>
                </form>)}

              {moved &&
                (<form className="deneme_form" onSubmit={handlepic}>
                  <p>Görsel oluşturmak için yazın</p>
                  <div className="form_alt">
                    <input
                      type="text"
                      required
                      value={userpromt}
                      onChange={(e) => setUserpromt(e.target.value)}
                    />
                  </div>
                  <div className="form_alt">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={stepvalue}
                      onChange={(e) => setStepvalue(e.target.value)}
                    />
                    <label>{`Adım Sayısı: ${stepvalue}`}</label>
                  </div>
                  <div className="form_alt">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={guidancescale}
                      onChange={(e) => setGuidancescale(e.target.value)}
                    />
                    <label>{`Yönlendirme Ölçeği: ${guidancescale}`}</label>
                  </div>
                  <div className="form_alt">
                    <input
                      type="range"
                      min="512"
                      max="1024"
                      value={widthvalue}
                      onChange={(e) => setWidthvalue(e.target.value)}
                    />
                    <label>{`Genişlik: ${widthvalue}px`}</label>
                  </div>
                  <div className="form_alt">
                    <input
                      type="range"
                      min="512"
                      max="1024"
                      value={heightvalue}
                      onChange={(e) => setHeightvalue(e.target.value)}
                    />
                    <label>{`Yükseklik: ${heightvalue}px`}</label>
                  </div>
                  {button && <button type="submit">Oluştur</button>}

                </form>)
              }
              <button className="info_button" on onClick={() => {
                if (info === true) setİnfo(false);
                if (info !== true) setİnfo(true);
              }}>ne işe yarıyor bu ayarlar?</button>
              {info &&
                (<div className="info">
                  <p>{"adım sayısı çizim yaparkenki çizim sayısı"}</p>
                  <p>{"yönlendirme: yazacağın promt'a bağlılık oranı(7-8 en iyi çıktıyı verir)"}</p>

                </div>)
              }
            </div>


            <div className="deneme_img_container">
              <div className="deneme_img">
                {loadingbox && <div className="spinner"></div>}
                {promtimage && <img src={promturl} alt="Generated" />}

              </div>

            </div>
          </div>




        </div>)}
    </div>
  );
};

export default Deneme;
