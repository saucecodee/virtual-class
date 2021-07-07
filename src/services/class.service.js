const Class = require("./../models/class.model");
const Student = require("./../models/student.model");
const CustomError = require("./../utils/custom-error");


class ClassService {

  async create(data) {

    const classData = {
      title: data.title,
      description: data.description,
      tutor_id: data.USER_ID,
      code: Math.floor(Math.random() * (10000 - 999) + 999)
    }

    return await new Class(classData).save();
  }

  async getTutorClasses(data) {
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

  async getOne(class_id) {
    const classs = await Class.findOne({ _id: class_id });
    if (!classs) throw new CustomError("Class does not exists");

    return classs
  }

  async update(class_id, data) {
    const classs = await Class.findByIdAndUpdate(
      { _id: class_id },
      { $set: data },
      { new: true }
    );

    if (!classs) throw new CustomError("Class dosen't exist", 404);

    return classs;
  }

  async delete(class_id) {
    const classs = await Class.findOne({ _id: class_id });
    classs.remove()
    return classs
  }

}


module.exports = new ClassService();