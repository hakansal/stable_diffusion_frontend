import React, { useState, useEffect } from "react";
import "./draw.scss";
import axios from "axios";

const Draws = () => {
  const backendurl = "http://localhost:3001/userapp/send/pics";
  const [pics, setPics] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const pullpics = async () => {
      try {
        const response = await axios.get(backendurl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPics(response.data.images);
      } catch (error) {
        console.error(error);
      }
    };

    pullpics();
  }, []);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(`http://localhost:3001${imgUrl}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="draws_main">
      <div className="draws_container">
        <div className="draw_info">
          <div className="frame">
            {pics.map((item, index) => (
              <div key={index} className="box" onClick={() => handleImageClick(item.url)}>
                <img src={`http://localhost:3001${item.url}`} alt={item.filename} />
                <p >{item.filename}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      {selectedImage && (
        <div className="modal_overlay" onClick={closeModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="full-size" />
            <button className="close_button" onClick={closeModal}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Draws;
