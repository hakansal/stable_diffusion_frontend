 
import "./main.scss";
import images from "./12.png"
import images2 from "./stable.jpg"



const Main = () => {




  return (
    <div className="main_class">
      <div className="main_container">
        <div className="main_slider">
          <img src={images} />
        </div>
        <div className="main_info">
          <h2>Resim Bilgisi</h2>
          <p>
            Bu bir rastgele resimdir. <br />
            Kaynak:
          </p>
        </div>
      </div>

      <div className="main_container">
         
        <div className="main_info">
          <h2>Resim Bilgisi</h2>
          <p>
            Bu bir rastgele resimdir. <br />
            Kaynak:
          </p>
        </div>
        <div className="main_slider">
          <img src={images2} />
        </div>
      </div>  
    </div>
  );
};

export default Main;
