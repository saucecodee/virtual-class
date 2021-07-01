const Class = require("./../models/class.model");
const CustomError = require("./../utils/custom-error");


class ClassService {

  async create(data) {
    return await new Class(data).save();
  }

  async getAll() {
    return await Class.find({});
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