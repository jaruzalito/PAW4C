import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul className="post-list">
                {posts.map(post => (
                    <li key={post.id} className="post-item">
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;