import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

function App() {
    return (
        <div>npm
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/page1">Page 1</Link></li>
                    <li><Link to="/page2">Page 2</Link></li>
                    <li><Link to="/page3">Page 3</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
            </Routes>
        </div>
    );
}

function Home() {
    return <h2>Home Page</h2>;
}

export default App;