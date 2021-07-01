const Lecture = require("./../models/lecture.model");
const CustomError = require("./../utils/custom-error");


class LectureService {

  async create(data) {
    return await new Lecture(data).save();
  }

  async getAll() {
    return await Lecture.find({});
  }

  async getOne(lecture_id) {
    const lecture = await Lecture.findOne({ _id: lecture_id });
    if (!lecture) throw new CustomError("Lecture does not exists");

    return lecture
  }

  async update(lecture_id, data) {
    const lecture = await Lecture.findByIdAndUpdate(
    { _id: lecture_id },
    { $set: data },
    { new: true }
    );

    if (!lecture) throw new CustomError("Lecture dosen't exist", 404);

    return lecture;
  }

  async delete(lecture_id) {
    const lecture = await Lecture.findOne({ _id: lecture_id });
    lecture.remove()
    return lecture
  }

}


module.exports = new LectureService();