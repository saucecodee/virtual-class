const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const attendanceSchema = new Schema(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      ref: 'classes',
      required: true
    },
    lecture_id: {
      type: Schema.Types.ObjectId,
      ref: 'lectures',
      required: true
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    joined_at: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


module.exports = mongoose.model("attendance", attendanceSchema)
