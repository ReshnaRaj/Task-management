import Login from '@/components/Login';
import Signup from '@/pages/Signup';
 
import { Route, Routes } from 'react-router-dom';

const AuthRoute = () => {
  return (
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path='/register' element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
  )
}

export default AuthRoute