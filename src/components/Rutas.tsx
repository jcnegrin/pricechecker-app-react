import React from 'react'
import { Card } from 'primereact/card'
import {BrowserRouter as Router, Routes, link, Route} from 'react-router-dom' ;

function Routes(){
return(
    <>
    <Router>
        <Routes>
          <Route path='/' element={< Card/>} />



        </Routes>
    </Router>
    </>
);

}

export default Routes;