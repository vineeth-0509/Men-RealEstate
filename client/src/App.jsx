import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/Home' element={<Home/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/signin' element={<SignIn/>}></Route>
    <Route path='/signup' element={<SignUp/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
