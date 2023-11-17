module.exports = (mongoose) => {
  const Recipe = mongoose.model(
    "recipe",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
        url: String,
        tags: [String],
      },
      { timestamps: true }
    )
  );
  return Recipe;
};
