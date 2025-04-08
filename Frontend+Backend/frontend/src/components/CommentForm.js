import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSubmitting(true);
        try {
            const response = await axios.post(
                `http://localhost:5000/api/posts/${postId}/comments`,
                { content }
            );
            onCommentAdded(response.data);
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
      <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows="3"
          className="comment-input"
      />
            <button
                type="submit"
                disabled={submitting}
                className="comment-submit-btn"
            >
                {submitting ? 'Adding...' : 'Add Comment'}
            </button>
        </form>
    );
};

export default CommentForm;