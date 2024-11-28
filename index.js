const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8080
const path = require ('path');
const methodOverride = require('method-override')
const ExpressError = require("./ExpressError")

const Chat = require('./models/chat.js');


// Change date and time 
// const Assignment = mongoose.model('Assignment', { dueDate: Date });
// const doc = await Assignment.findOne();
// doc.dueDate.setMonth(3);
// await doc.save(); // THIS DOES NOT SAVE YOUR CHANGE

// doc.markModified('dueDate');
// await doc.save()



app.set ('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use (express.static(path.join(__dirname, "public")))
app.use (express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Whatsapp');
}


app.get ('/chat', async (req, res, next) => {        //when dealing Database always use async/await
    try {
    const chats = await Chat.find ();
    res.render ("home.ejs", { chats })
    } catch (err) {
        next (err)
    }
})

app.get ('/chat/new', (req, res, next) => {
    try {
        res.render ("createChat.ejs")
    } catch (err) {
        next (err)
    }
})


app.post ('/chat', async (req, res, next) => {
    try {
        let { from, to, msg } = req.body;
        const { updatedAt } = req.body;
        let newChat = new Chat ({ 
            from: from,
            to: to,
            msg: msg,
            createdAt: new Date(),  //new Date() is used to get current date and time automatically. It's not necessary to provide it manually.
        });
    
        newChat.save()
        .then ((res) => console.log ("Chat saved successfully"))    //when using .then/.catch no need to use aysnc/await
        .catch ((err) => console.log (err));
    
    
        let updateDate = await Chat.findOne ();
            if (!updateDate) {
                updateDate = new Date();
            }
        updateDate.updatedAt = new Date(updatedAt);
        await updateDate.save()
    
        res.redirect('/chat')
    } catch (err) {
        next (err)
    }
})




app.get ('/chat/:id/edit', async (req, res, next) => {
    try {
        let { id } = req.params;
        let chat =await Chat.findById (id);
        res.render ("edit.ejs", { chat })
    } catch (err) {
        next (err)
    }
})


//update route
app.put ('/chat/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let chatUpdate = await Chat.findByIdAndUpdate (id, { msg: newMsg }, {updatedAt: newDate()}, {runValidators: true}, { new: true });
    
        console.log (chatUpdate);
        res.redirect('/chat')
    } catch (err) {
        next (err);
    }

})


app.delete ('/chat/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let chatDelete = await Chat.findByIdAndDelete (id);
        console.log (chatDelete);
        res.redirect('/chat')
    } catch (err) {
        next (err);
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// ErrorHandler
app.use ((err, req, res, next) => {
    let { status="500", message="Some error occurred" } = err;
    res.status(status).send(message);
})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})