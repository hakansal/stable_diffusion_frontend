import React, { useState, useEffect } from "react";
import "./account.scss";
import axios from "axios";


const Account = () => {
    const [isactive, setisative] = useState(false);
    const [userResponse, setUserResponse] = useState({});
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password2, setPassword2] = useState("");
    let passcheck = false;
    const backendurlinfo = "http://localhost:3001/userapp/kullanici";
    const backendurlupdate_isim = "http://localhost:3001/userapp/guncelle/isim";
    const backendurlupdate_sifre = "http://localhost:3001/userapp/guncelle/sifre";

    //tokenın suresi geçince local storagedan kaldırsın 
    //backende user_log bilgileri de dönderilsin hatta kullanıcı kaç kere resim çizmiş onlarda dönderilsin


    //giriş kontrolü
    const enteringAccount = () => {
        const token = localStorage.getItem("token");
        if (token == null) {
            setisative(false);
        }
        if (token != null) {
            setisative(true);
            pullUser();
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


    // istekler
    const pullUser = async () => {

        try {
            const response = await axios.get(backendurlinfo, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`

                }
            });

            setUserResponse(response.data);
            return response.data;

        } catch (error) {
            alert("hata");

        }

    }


    //şifre değişimi

    const handlepassword = async (e) => {
        e.preventDefault();
        const data_user_update = {
            newpassword: password
        }
        try {
            //şifre kontol  


            if (passcheck == false) {
                if (!password && !password2) {
                    alert("iki şifreyi de girin")
                    passcheck = true;
                }
                if (password != password2) {
                    alert("şifreler aynı değil")
                    passcheck = false;

                }
                else {

                    passcheck = true;

                }
            }

            if (passcheck == true) {

                //backend istek atma
                const response = await axios.post(backendurlupdate_sifre, data_user_update, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                alert("Güncellendi");
                passcheck = true
                setPassword("");
                setPassword2("")
            }
            if (passcheck == false) alert("şifreler aynı değil");

        } catch (error) {

            alert("hata")
        }


    }
    //username updateti
    const handleusername = async (e) => {
        e.preventDefault();
        const update_username = {
            username: username
        }

        try {

            const response = await axios.post(backendurlupdate_isim, update_username, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("Güncellendi");

            await pullUser();
            setUsername("");


        } catch (error) {
            console.error(error);
            alert("Hata!");
        }
    }

    return <>
        {
            isactive &&
            (
                <div className="main_acount">


                    <div className=" account_container">


                        <div className="user_info">
                            <div className="account_header">
                                <h2> {userResponse.username}</h2>
                                <h3>  {userResponse.email}</h3>

                            </div>
                            <div className="hrx">

                            </div>

                            <div className="account_info">
                                <div className="section">
                                    <h4>kayıt tarihi:</h4>
                                    <p>{new Date(userResponse.sign_date).toLocaleDateString()}</p>
                                </div>
                                <div className="section">
                                    <h4> günlük kullanım hakkı:</h4>
                                    <p>{5 - userResponse.uses}</p>
                                </div>

                                <div className="section">
                                    <h4>💳 Ödeme Bilgisi:</h4>
                                    {userResponse.paycheck == false &&
                                        (<p>abonelik yok</p>)}
                                    {userResponse.paycheck == true &&
                                        (<p>abonelik aktif</p>)}
                                </div>

                                <div className="section">
                                    <h4>📅 Abonelik Bitiş Tarihi:</h4>
                                    <p>{userResponse.subs_limit_date ? new Date(userResponse.subs_limit_date).toLocaleDateString() : "Yok"}</p>
                                </div>


                                <div className="section">
                                    <h4>📝 Abonelik Notu:</h4>
                                    <p>{userResponse.subs_log || "Yok"}</p>
                                </div>
                                <div className="section_list">

                                    <div className="section">
                                        <h4>🔁 Tüm Giriş Tarihleri:</h4>
                                        <ul>
                                            {userResponse.allLogindates?.map((date, index) => (
                                                <li key={index}>{new Date(date).toLocaleString()}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="form_all">
                            <form className="account_form">
                                <div className="form_section">
                                    <label>kullanıcı adı</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                    <button onClick={handleusername} >güncelle</button>
                                </div>
                                 



                            </form>
                            <form onSubmit={handlepassword} className="account_form">
                                <div className="form_section">
                                    <label>şifre</label>

                                    <input
                                        type="password"
                                        value={password}
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    <input
                                        type="password"
                                        required
                                        value={password2}
                                        onChange={(e) => {
                                            setPassword2(e.target.value)
                                        }}
                                    />

                                    <button type="submit" >güncelle</button>
                                </div>
                            </form>

                        </div>


                    </div>



                </div>
            )
        }

    </>
}

export default Account;