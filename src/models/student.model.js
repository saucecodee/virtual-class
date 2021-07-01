const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const studentSchema = new Schema(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      ref: 'classes',
      required: true
    },
    tutor_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    status: {
      type: String,
      trim: true,
      enum: ["ACTIVE", "SUSPENDED"]
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


module.exports = mongoose.model("student", studentSchema)
