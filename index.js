const express = require('express');
const fetch = require('node-fetch'); // or use axios

const app = express();
const port = 3000;

app.use(express.json());

// API route to get the User ID
app.post('/getUserID', async (req, res) => {
    const username = req.body.username;

    try {
        // Make a POST request to the Roblox API
        const response = await fetch('https://users.roblox.com/v1/usernames/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: false
            }),
        });

        const data = await response.json();

        if (data.data.length > 0) {
            // Return the first user's ID
            res.json({ userID: data.data[0].id });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user ID' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
