import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

const fetchPost = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
        throw new Error("Post nie znaleziony");
    }
    return response.json();
};

const PostPage = () => {
    const { id } = useParams();
    const { data: post, error, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(id),
    });

    if (isLoading) return <p>Ładowanie...</p>;
    if (error) return <p>Błąd: {error.message}</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link to="/">Powrót do listy postów</Link>
        </div>
    );
};

export default PostPage;
