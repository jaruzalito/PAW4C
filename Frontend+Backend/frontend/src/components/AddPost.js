import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return;

        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/posts', {
                title,
                content
            });
            navigate('/posts');
        } catch (error) {
            console.error('Error adding post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-post-container">
            <h2>Add New Post</h2>
            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={5}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? 'Submitting...' : 'Add Post'}
                </button>
            </form>
        </div>
    );
};

export default AddPost;