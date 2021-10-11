import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    role:{ type: String, enumValues: ["Student", "Teacher"]},
    courses: [{ type: Schema.Types.ObjectId, ref: 'courses' }]
})

const courseSchema = new mongoose.Schema({
    title: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    books: [{ type: Schema.Types.ObjectId, ref: 'books' }]
})

const bookSchema = new mongoose.Schema({
    title: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'courses' }]
})

export const User = mongoose.model('users', userSchema);
export const Course = mongoose.model('courses', courseSchema);
export const Book = mongoose.model('books', bookSchema);