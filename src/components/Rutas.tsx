import { Card } from 'primereact/card'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' ;

function AppRoutes(){
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

export default AppRoutes;