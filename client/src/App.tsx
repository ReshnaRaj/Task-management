import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
const AuthRoutes = React.lazy(() => import('@/Routes/AuthRoute'));
function App() {
  


  return (
    <> 
     <ThemeProvider>
     <Toaster  position="top-center" />
      <Router>
        <Routes>
          <Route path="/*" element={<AuthRoutes/>}></Route>
        </Routes>
      </Router>
      </ThemeProvider>
      
    </>
  )
}

export default App
