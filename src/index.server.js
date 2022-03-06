const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
;
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin/auth');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const initialRouter = require('./routes/admin/initialData');


env.config();
app.use(express.json());
app.use(cors());
app.use('/api', authRouter);
app.use('/api', adminRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', initialRouter);

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pped4.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
.then(() => {
    console.log('DataBase Conected...!!')
})

app.listen(process.env.PORT, () => {
    console.log(`Server Runing On PORT ${process.env.PORT}`)
});