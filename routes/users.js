const express = require('express');
const router = express.Router();

// Mock Database
let users = [
    { id: 1, name: "Jan Janssen", email: "jan@example.com" },
    { id: 2, name: "Piet Peters", email: "piet@example.com" }
];

// 1. Lijst ophalen (Read All)
router.get('/', (req, res) => {
    res.json(users);
});

// 2. Details weergeven (Read One)
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Gebruiker niet gevonden');
    res.json(user);
});

// 3. Nieuwe entiteit toevoegen (Create)
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 4. Bestaande entiteit updaten (Update)
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Gebruiker niet gevonden');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// 5. Entiteit verwijderen (Delete)
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('Gebruiker niet gevonden');

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

module.exports = router;