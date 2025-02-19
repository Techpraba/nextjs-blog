import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

// ✅ Prevents recompilation of the model
const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);

export default postModel;
