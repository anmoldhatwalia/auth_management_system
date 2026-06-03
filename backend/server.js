const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes/auth.route')
// console.log(router);

const app = express();
app.use(express.json())

app.use(cors());

app.use('/api/auth',router)

app.get('/',(req,res)=>{
    res.send('Server is running')
})
app.post('/test-post', (req, res) => {
    res.json({ message: 'POST working' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is runnning in http://localhost:${PORT}`)
    });
});
