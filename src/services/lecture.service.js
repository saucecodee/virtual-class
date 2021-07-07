const Lecture = require("./../models/lecture.model");
const CustomError = require("./../utils/custom-error");


class LectureService {

  async create(data) {
    return await new Lecture(data).save();
  }

  async getTutorLectures(data) {
    const { tutor_id } = data
    const classes = await Class.find({ tutor_id }).populate("tutor_id");

    const result = []

    for (const classs of classes) {
      result.push({
        _id: classs._id,
        title: classs.title,
        tutor: classs.tutor_id.name,
        students: classs.no_of_students,
        lectures: classs.no_of_lectures,
        code: classs.code
      })
    }

    return result
  }

  async getStudentClasses(data) {
    const { student_id } = data
    const studentC = await Student.find({ student_id }).populate("class_id tutor_id");

    const result = []

    for (const classs of studentC) {
      result.push({
        _id: classs._id,
        title: classs.class_id.title,
        tutor: classs.tutor_id.name,
        students: classs.class_id.no_of_students,
        lectures: classs.class_id.no_of_lectures,
        code: classs.class_id.code,
      })
    }

    return result
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