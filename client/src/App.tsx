import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
const AuthRoutes = React.lazy(() => import('@/Routes/AuthRoute'));
function App() {
  


  return (
    <> 
     <Toaster  position="top-center" />
      <Router>
        <Routes>
          <Route path="/*" element={<AuthRoutes/>}></Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
