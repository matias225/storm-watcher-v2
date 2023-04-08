import { Routes, Route } from 'react-router-dom';
import { GetUser } from './components/GetUser';
import { Login } from './components/Login';
import { MainPage } from './components/MainPage';
import { CreateUser } from './components/CreateUser';

export function StormApp() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/welcome' element={<GetUser/> } />
        <Route path='/register' element={<CreateUser/> } />
      </Routes>
    </>
  );
}