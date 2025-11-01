import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, default: "👤" },
  gradient: { type: String, default: "linear-gradient(135deg, #667eea, #764ba2)" }
});

export default mongoose.model("Team", teamSchema);
