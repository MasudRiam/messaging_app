const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Whatsapp');
}

let AllChat = [
    {
        from: "Riam",
        to: "John",
        msg: "Hi, how are you?",
        createdAt: new Date()
    },
    {
        from: "John",
        to: "Riam",
        msg: "I'm good, thanks! How about you?",
        createdAt: new Date()
    },
    {
        from: "Neha",
        to: "Shihab",
        msg: "Where is your office?",
        createdAt: new Date()
    },
    {
        from: "Rakib",
        to: "Jabbar",
        msg: "I'm at the office, at the 2nd floor.",
        createdAt: new Date()
    },
    {
        from: "Jahid",
        to: "Jabbar",
        msg: "How long have you been working here?",
        createdAt: new Date()
    },
    {
        from: "Khan",
        to: "Hashib",
        msg: "Send me your CV.",
        createdAt: new Date()
    },
    {
        from: "Hashib",
        to: "Khan",
        msg: "Here you go.",
        createdAt: new Date()
    }
];

Chat.insertMany(AllChat);