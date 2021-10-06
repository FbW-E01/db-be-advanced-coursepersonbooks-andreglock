import mongoose from 'mongoose';
import faker from 'faker';
import { User, Book, Course } from './schemas.js';

// User Made:
// db.createUser({ user: "mongoUser", pwd: "password", roles: [{role:"readWrite", db:"coursepersonbooks"}] })
const connectionString = `mongodb://mongoUser:password@localhost:27017/coursepersonbooks`

mongoose.connection.on('error', (err) => console.log('ERROR:', err));
mongoose.connection.on('connecting', () => console.log(">> Connecting"));
mongoose.connection.on('disconnecting', () => console.log(">> Disconnecting"));
mongoose.connection.on('disconnected', () => console.log(">> Disconnected"));

await mongoose.connect(connectionString);

await User.deleteMany();
await Book.deleteMany();
await Course.deleteMany();

mongoose.disconnect();

