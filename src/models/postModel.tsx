import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    name: String,
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now } // Store as a Date, not String
  },
  { toJSON: { virtuals: true } }
);

// ✅ Virtual field for short description
postSchema.virtual("shortDescription").get(function () {
  return this.description ? this.description.substring(0, 50) + "..." : "";
});

// ✅ Virtual field for formatted creation date
postSchema.virtual("createdAtFormatted").get(function () {
  return this.createdAt ? ChangeDate(this.createdAt) : "";
});

// ✅ Updated ChangeDate function
function ChangeDate(date_str: string | number | NativeDate) {
  const date = new Date(date_str);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Prevents recompilation of the model
const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);

export default postModel;
