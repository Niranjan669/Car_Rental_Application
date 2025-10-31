import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cars from './pages/Cars';
import Booking from './pages/Booking';
import Header from './components/Header';
import Footer from './components/Footer';
import API from './services/api';

function App(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchMe(){
      try {
        const res = await API.get('/api/me');
        if(res.data && res.data.loggedIn){
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    }
    fetchMe();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} setUser={setUser}/>
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/cars" element={<Cars user={user} />} />
          <Route path="/booking" element={<Booking user={user} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
