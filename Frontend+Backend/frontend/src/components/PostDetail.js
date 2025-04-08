import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleCommentAdded = (newComment) => {
        setPost(prevPost => ({
            ...prevPost,
            comments: [...prevPost.comments, newComment]
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h2>Comments</h2>
            <CommentList comments={post.comments} />
            <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
        </div>
    );
};

export default PostDetail;