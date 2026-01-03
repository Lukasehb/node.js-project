const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const newsPostRoutes = require('./routes/newsposts');

// Koppel routes
app.use('/api/users', userRoutes);
app.use('/api/newsposts', newsPostRoutes);

// Root Documentatie Pagina (Requirement)
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="nl">
    <head><title>API Documentatie</title></head>
    <body>
        <h1>Project API Documentatie</h1>
        <h2>Endpoints</h2>
        
        <h3>Users</h3>
        <ul>
            <li><strong>GET /api/users</strong> - Alle users (ondersteunt ?limit=10&offset=0 en ?search=naam)</li>
            <li><strong>GET /api/users/:id</strong> - User details</li>
            <li><strong>POST /api/users</strong> - Nieuwe user (JSON body: name, email)</li>
            <li><strong>PUT /api/users/:id</strong> - Update user</li>
            <li><strong>DELETE /api/users/:id</strong> - Verwijder user</li>
        </ul>

        <h3>NewsPosts</h3>
        <ul>
            <li><strong>GET /api/newsposts</strong> - Alle posts</li>
            <li><strong>GET /api/newsposts/:id</strong> - Post details</li>
            <li><strong>POST /api/newsposts</strong> - Nieuwe post (JSON body: title, content, category)</li>
            <li><strong>PUT /api/newsposts/:id</strong> - Update post</li>
            <li><strong>DELETE /api/newsposts/:id</strong> - Verwijder post</li>
        </ul>
    </body>
    </html>
    `;
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});