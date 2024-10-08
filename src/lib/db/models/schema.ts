import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    img: { type: String },
});

const noteSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createAt: {
        type: Date,
        required: true
    }
});


const User = mongoose.models.User || mongoose.model('User', userSchema);
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

export { User, Note };


