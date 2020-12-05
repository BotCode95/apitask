import mongoose from 'mongoose';
import config from './config';
(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Database conectada', db.connection.name)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})(); 
