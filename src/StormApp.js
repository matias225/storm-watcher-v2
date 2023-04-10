import { Routes, Route } from 'react-router-dom';
import { GetUser } from './components/GetUser';
import { LoginScreen } from './components/LoginScreen';
import { MainPage } from './components/MainPage';
import { CreateUser } from './components/CreateUser';

export function StormApp() {
  return (
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route exact path='/login' element={<LoginScreen />} />
        <Route path='/welcome' element={<GetUser/> } />
        <Route path='/register' element={<CreateUser/> } />
      </Routes>
  );
}