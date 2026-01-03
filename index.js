const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());
const userRoutes = require('./routes/users');
const newsPostRoutes = require('./routes/newsposts');
app.use('/api/users', userRoutes);
app.use('/api/newsposts', newsPostRoutes);

app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});