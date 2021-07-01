const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const lectureSchema = new Schema(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      ref: 'classes',
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    begins_at: {
      type: Date,
      required: true
    },
    ends_at: {
      type: Date,
      required: true
    },
    no_of_attendees: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      trim: true,
      enum: ["UPCOMING", "ONGOING", "ENDED", "CANCELED"]
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


module.exports = mongoose.model("lecture", lectureSchema)
