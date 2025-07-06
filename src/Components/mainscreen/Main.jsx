
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
          <h2>Stable difusion</h2>
          <div className="pp">
            <ul>
              <li>
                <span>
                  Stable Diffusion modeli sayesinde, hayal ettiğiniz tarzda benzersiz resimler oluşturabilir ve bu görselleri istediğiniz şekilde şekillendirip kişiselleştirebilirsiniz.

                </span>
              </li>
              <br></br>
              <li>
                Yapay zekânın sunduğu güçlü olanaklarla yaratıcılığınızı özgür bırakır, etkileyici ve özgün görsel içerikler üretme imkanı elde edersiniz.

              </li>
            </ul>

          </div>
        </div>
      </div>

      <div className="main_container">

        <div className="main_info">
          <div className="pp">
            <ul>
              <li>
                <span>
                  Bu sitede, Stable Diffusion modeliyle hayal ettiğiniz görüntüleri metin olarak yazıp kolayca görsel haline getirebilirsiniz.

                </span>
              </li>
              <br></br>
              <li>
                <span>
                  Oluşturduğunuz görseller, ekstra bir işlem yapmanıza gerek kalmadan otomatik olarak kaydedilir; böylece dilediğiniz zaman galerinizden ulaşabilir ve kullanabilirsiniz. Kullanımı basit ve hızlı arayüzü sayesinde yaratıcılığınızı özgürce keşfetmenize olanak sağlar.

                </span>
              </li>
            </ul>
 
          </div>
        </div>
        <div className="main_slider">
          <img src={images2} />
        </div>
      </div>
    </div>
  );
};

export default Main;
