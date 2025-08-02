import Login from '@/components/Login';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
 
import { Route, Routes } from 'react-router-dom';

const AuthRoute = () => {
  return (
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path='/register' element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
   </Routes>
  )
}

export default AuthRoute