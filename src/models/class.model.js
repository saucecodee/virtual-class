const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const classSchema = new Schema(
  {
    tutor_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    code: {
      type: String,
    },
    no_of_students: {
      type: Number,
      default: 0
    },
    no_of_lectures: {
      type: Number,
      default: 0
    },
    lectures_done: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


module.exports = mongoose.model("class", classSchema)