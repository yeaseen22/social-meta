const Message = require('../models/Message');

const createMessage = async (req, res) => {
    const newMessage = new Message(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    } catch(error) {
        res.status(500).json(error);
    }
};

const getMessageByConversationId = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const message = await Message.find({
            conversationId: conversationId
        });

        if (!message) throw res.status(404).json({ message: 'Conversation Not Found!' });
        res.status(200).json(message);

    } catch(error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createMessage,
    getMessageByConversationId
};
