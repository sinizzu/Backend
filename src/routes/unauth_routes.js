const express = require('express');
const router = express.Router();
const searchController = require('../controllers/paper_search_controller');

router.get('/searchKeyword', async (req, res) => {
    try {
        const { searchword } = req.query;
        const data = await searchController.searchKeyword(searchword);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

router.get('/searchColl', async (req, res) => {
    try {
        const { searchword } = req.query;
        const data = await searchController.searchColl(searchword);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch collection' });
    }
});


module.exports = router;
