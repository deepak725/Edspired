import './App.css';
import Login from './Components/Login/login';
import Register from './Components/Regiter/Register';
import Home from './Components/Home/home';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
