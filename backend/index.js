const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Hardcoded user details
const userDetails = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};

// POST /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input. 'data' must be an array." });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        // Find the highest alphabet (case insensitive)
        let highest_alphabet = [];
        if (alphabets.length > 0) {
            highest_alphabet = [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)];
        }

        res.json({
            is_success: true,
            ...userDetails,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error." });
    }
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});