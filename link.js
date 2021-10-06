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

// Assign two books per course and courses per book:
const books = await Book.find();
const courses = await Course.find();

for (let i = 0; books.length !== 0; i++) {
    // Take one random book out of the array
    const bookOne = books.splice(Math.floor(Math.random() * books.length), 1)
    const bookTwo = books.splice(Math.floor(Math.random() * books.length), 1)

    courses[i].books.push(bookOne[0]);
    courses[i].books.push(bookTwo[0]);
    bookOne[0].courses.push(courses[i]);
    bookTwo[0].courses.push(courses[i]);
    await courses[i].save();
    await bookOne[0].save();
    await bookTwo[0].save();
}

// Save two different courses per Student:
/* const students = await User.find({role: 'Student'});
const courses = await Course.find();

for (let i = 0; i < students.length; i++) {
    const courseOne = Math.floor(Math.random() * 5);
    let courseTwo = Math.floor(Math.random() * 5);
    while (courseOne === courseTwo) {
        courseTwo = Math.floor(Math.random() * 5);
    }
    students[i].courses.push(courses[courseOne]);
    students[i].courses.push(courses[courseTwo]);
    await students[i].save();
} */

// Save one teacher per course:
/* const teachers = await User.find({role: 'Teacher'});
const courses = await Course.find();

for (let i = 0; i < teachers.length; i++) {
    teachers[i].courses.push(courses[i]);
    await teachers[i].save(); 
} */

mongoose.disconnect();