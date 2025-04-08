import React from 'react';

const CommentList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p className="no-comments">No comments yet. Be the first to comment!</p>;
    }

    return (
        <div className="comment-list">
            <h3 className="comment-section-title">Comments ({comments.length})</h3>
            <ul className="comment-ul">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-content">{comment.content}</div>
                        <div className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;