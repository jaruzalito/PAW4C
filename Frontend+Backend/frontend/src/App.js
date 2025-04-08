import { Link, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import './styles.css';
import PostDetail from './components/PostDetail';

function App() {
    return (
        <div className="app">
            <nav className="main-nav">
                <Link to="/" className="nav-button">Home</Link>
                <Link to="/posts" className="nav-button">All Posts</Link>
                <Link to="/add-post" className="nav-button">Add New Post</Link>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </div>
    );
}

function HomePage() {
    return (
        <div className="home-page">
            <h1>Welcome to My Blog</h1>
            <div className="button-container">
                <Link to="/posts" className="action-button">View All Posts</Link>
                <Link to="/add-post" className="action-button">Create New Post</Link>
            </div>
        </div>
    );
}

export default App;