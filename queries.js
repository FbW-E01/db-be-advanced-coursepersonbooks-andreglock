import mongoose from 'mongoose';
import { User, Book, Course } from './schemas.js';

// User Made:
// db.createUser({ user: "mongoUser", pwd: "password", roles: [{role:"readWrite", db:"coursepersonbooks"}] })
const connectionString = `mongodb://mongoUser:password@localhost:27017/coursepersonbooks`

mongoose.connection.on('error', (err) => console.log('ERROR:', err));
mongoose.connection.on('connecting', () => console.log(">> Connecting"));
mongoose.connection.on('disconnecting', () => console.log(">> Disconnecting"));
mongoose.connection.on('disconnected', () => console.log(">> Disconnected"));

await mongoose.connect(connectionString);

// Query courses from one student
const query = User.findOne({role: 'Student'});
const courses = query.select('courses'); // select which field to get from user data
//query.populate("posts", ["content"]);
//console.log('Courses:', courses);
console.log(await query.exec());

mongoose.disconnect();