import Login from '@/components/Login';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes } from 'react-router-dom';

const AuthRoute = () => {
  return (
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path='/register' element={<Signup/>}/>
    {/* <Route path="/login" element={<Login/>}/> */}
     <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home/>} />
        
      </Route>
   </Routes>
  )
}

export default AuthRoute