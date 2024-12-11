// src/App.jsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Post from './pages/Post';
import Categories from './pages/Categories';

function App() {
    return (
        <div className="app">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </div>
    );
}

export default App;