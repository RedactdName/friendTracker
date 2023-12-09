const express = require('express');
const router = express.Router();

router.post('/update-location', (req, res) => {
    console.log('Location update received:', req.body);
    res.json({ 'status': 200 });
});

module.exports = router;
