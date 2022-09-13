import './App.css';
import React from 'react';
import { Routes , Route, } from 'react-router-dom';
import { Login, Homepage, ChooseDays, Dashboard, RestDay, } from './Pages/AllPages'
import {PrivateRoute1, PrivateRoute2, PrivateRoute3} from './Routes/allRoutes';
import 'antd/dist/antd.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute1><Login/></PrivateRoute1>}></Route>
        <Route path='/login' element={<PrivateRoute1><Login/></PrivateRoute1>}></Route>
        <Route path='/anasayfa' element={<PrivateRoute2><Homepage/></PrivateRoute2>}>
          <Route index={true} element={<ChooseDays/>}></Route> 
          <Route path='tatilgunleri' element={<RestDay/>}></Route>
          <Route path='dashboard' element={<PrivateRoute3><Dashboard/></PrivateRoute3>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
