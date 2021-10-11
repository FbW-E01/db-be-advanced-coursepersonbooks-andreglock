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

for (let i = 0; i < 100; i++) {
    await User.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        role: "Student"
    })
}

for (let i = 0; i < 5; i++) {
    await User.create({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        role: "Teacher"
    })
}

for (let i = 0; i < 5; i++) {
    await Course.create({
        title: faker.name.jobTitle()
    })
}

for (let i = 0; i < 10; i++) {
    await Book.create({
        title: faker.name.title()
    })
}

mongoose.disconnect();

