import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "@/components/ui/sonner";
const AuthRoutes = React.lazy(() => import('@/Routes/AuthRoute'));
function App() {
  


  return (
    <> 
      <Router>
        <Routes>
          <Route path="/*" element={<AuthRoutes/>}></Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App
