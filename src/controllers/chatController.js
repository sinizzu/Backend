const historyService = require('../services/historyService');

async function saveChat(req, res) {
  try {
      const { uuid, message, sender, email } = req.body;
      const result = await historyService.saveChatHistory(uuid, message, sender, email);

      res.status(201).json({
          message: 'Chat history saved successfully',
          data: result
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}



async function getChatHistory(req, res) {
  try {
      const { uuid, email, sender } = req.query; 
      const result = await historyService.getChatHistoryByUUIDAndEmail(uuid, email, sender);

      res.status(200).json({
          message: 'Chat history retrieved successfully',
          data: result
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

module.exports = {
    saveChat,
    getChatHistory
};
