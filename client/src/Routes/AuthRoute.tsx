import Login from '@/components/Login';
import Signup from '@/components/Signup';
 
import { Route, Routes } from 'react-router-dom';

const AuthRoute = () => {
  return (
   <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path='/register' element={<Signup/>}/>
   </Routes>
  )
}

export default AuthRoute