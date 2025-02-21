module.exports = (req, res) => {
    if (req.method === 'POST') {
      try {
        const { data } = req.body;
  
        if (!data || !Array.isArray(data)) {
          return res.status(400).json({ is_success: false, error: "Invalid input. 'data' must be an array." });
        }
  
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        let highest_alphabet = [];
        if (alphabets.length > 0) {
          highest_alphabet = [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)];
        }
  
        res.json({
          is_success: true,
          user_id: "john_doe_17091999",
          email: "john@xyz.com",
          roll_number: "ABCD123",
          numbers,
          alphabets,
          highest_alphabet
        });
      } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error." });
      }
    } else if (req.method === 'GET') {
      res.status(200).json({ operation_code: 1 });
    } else {
      res.status(405).json({ error: "Method not allowed." });
    }
  };