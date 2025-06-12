 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//componentler
import Login from './Components/giris/Giris';
import NavBar from './Components/navbar/NavBar';
import Sign from './Components/kayıt/Kayit';
import Main from './Components/mainscreen/Main';
import Deneme from './Components/deneme/deneme';
import Account from './Components/hesabım/Account';
import Subscribe from './Components/subscirebe/Subscirebe';
import Hak from './Components/hakk/hakk'; 
import Draws from './Components/cizim/draw';
import Forgot from './Components/forgot/forgot';

 

function App() {
  return (
    <div className="App">

      <Router>
         <NavBar/>

         <Routes>
          <Route path='/' element={<Main/>}/>
          < Route path="/giris" element={<Login/>}/>
          < Route path="/kayit" element={<Sign/>}/>
          <Route path="/anasayfa" element={<Main/>}/>
         <Route path="/deneme" element={<Deneme/>}/>
         <Route path="/hesabım" element={<Account/>}/>
         <Route path='/abone' element={<Subscribe/>}/>
         <Route path='/hakkimizda' element={<Hak/>}/>
         <Route path='/pics' element={<Draws/>}/>
        <Route path="/unuttum" element={<Forgot/>}/>
          


         </Routes>

      </Router>
      
    </div>
  );
}

export default App;
