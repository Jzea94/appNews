import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150
    },
    category: {
      type: String,
      required: true,
      enum: ["politics", "sports", "tech", "economy", "world", "culture", "other"],
      default: "other",
      set: (c) => c.toLowerCase().trim()
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50
    },
    content: {
      type: String,
      required: true,
      minlength: 1
    },
    readTime: {
      type: Number,
      min: 1,
      max: 60
    },
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 250
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

newsSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const words = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(words / 200);
  }
  next();
});

newsSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.content) {
    const words = update.content.split(/\s+/).length;
    update.readTime = Math.ceil(words / 200);
    this.setUpdate(update);
  }

  next();
});



export default mongoose.model("News", newsSchema);
