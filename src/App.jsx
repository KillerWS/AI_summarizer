//import React from 'react'

import './App.css'
import MySplitComponent from "./components/MySplitComponent"
import { BrowserRouter, Route, Routes, } from "react-router-dom";
const App = () => {
  return (
    <main>
        <BrowserRouter>
          <Routes>
            <Route path="/*" exact element={<MySplitComponent/>}></Route>
            <Route path="/v1/:modelNum" element={<MySplitComponent/>} />
          </Routes>
       </BrowserRouter>     
            
         {/* <div className="app">
                <MySplitComponent/>
            </div> */}

    </main>
  )
}

export default App
