import React, {useState} from 'react'

import "./App.css";
import About from "./component/About";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import Alert from './component/Alert';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(props) {
  //const titlesInfo = {title: "Navin",title1: "Navin12345"};
  const [mode,setMode] = useState("light");
  const [alert,setAlert] = useState(null);

  const showAlert = (msg,type)=>{
    setAlert({
      type : type,
      msg: msg
    })
  }
  

  //const textModeName = {darkMode:"Enable Dark Mode",lightMode:"Enable Light Mode"}

  //const [modeText,setModeText] =useState(textModeName.darkMode);
  
  const toggleMode= ()=>
  {
    if(mode === 'light')
    {
      setMode("dark")
      //setModeText(modeText)
      document.body.style.backgroundColor = "#FAC898";
      showAlert("Dark Mode is Enabled","success");

      setTimeout(() =>{
        setAlert(null);
      },500);
    }
    else{
      setMode("light")
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode is Enabled","success");
      //setModeText(textModeName.lightMode)
    }
  }

  return (
    <>
    <BrowserRouter>
     <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} aboutText="About Text"></Navbar>
     <Alert alert={alert}></Alert>
     {/* <About></About> */}
     <div className="container" my-3>
     <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/" element={<TextForm  showAlert={showAlert} heading="Enter the text to analyze
          " style={{backgroundColor:props.mode === "dark" ? "grey" : "white"}} mode={mode}></TextForm>}/>
      </Routes>
      </div>
      </BrowserRouter>
     {/* <Navbar title={titlesInfo}></Navbar> */}
    </>
  );
}

export default App;
