import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error("Błąd ładowania postów");
    }
    return response.json();
};

const HomePage = () => {
    const { data: posts, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Ładowanie...</p>;
    if (error) return <p>Błąd: {error.message}</p>;

    return (
        <div>
            <h1>Lista postów</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <button style={{ textAlign: 'center', marginTop: '2rem', color: '#F43596' , width:'100%'}}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
