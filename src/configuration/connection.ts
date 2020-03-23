import * as mongoose from 'mongoose';

const mongooseConfig: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
};

mongoose.connect(process.env.MONGO_CONNECTION, mongooseConfig);

mongoose.connection.on('close', () => {
    process.exit(1);
});
