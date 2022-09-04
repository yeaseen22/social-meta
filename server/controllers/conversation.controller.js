const Conversation = require('../models/Conversation');

const createConversation = async (req, res) => {
    const { senderId, receiverId } = req.body;

    const newConversation = new Conversation({
        members: [senderId, receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);

    } catch(error) {
        res.status(500).json(error);
    }
};

const getConversationByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversation = await Conversation.find({
            members: { $in: [userId] }
        });

        if (!conversation) throw res.status(404).json({ message: 'Conversation Not Found!' });
        res.status(200).json(conversation);

    } catch(error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createConversation,
    getConversationByUserId
};
