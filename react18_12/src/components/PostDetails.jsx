import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postResponse.json();
                setPost(postData);

                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [id]);

    if (loading) {
        return <p>Loading post details...</p>;
    }

    if (!post || !user) {
        return <p>Post not found</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h3>Author Information</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Website: {user.website}</p>
            <Link to="/">Back to Posts</Link>
        </div>
    );
}

export default PostDetails;
