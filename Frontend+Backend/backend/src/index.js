const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
                categories: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.get('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                categories: true
            }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

app.post('/api/posts', async (req, res) => {
    const { title, content, categoryIds } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                categories: {
                    connect: categoryIds?.map(id => ({ id: parseInt(id) })) || []
                }
            },
            include: {
                categories: true
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});
app.post('/api/posts/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postId: parseInt(id)
            }
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

async function testConnection() {
    try {
        const testPost = await prisma.post.findFirst();
        console.log('Połączenie z bazą OK. Przykładowy post:', testPost);
    } catch (error) {
        console.error('Błąd połączenia z bazą:', error);
    }
}
testConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});