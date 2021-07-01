const LectureServ = require("./../services/lecture.service");
 
const response = require("./../utils/response");


class LectureContoller {

   async create(req, res) {
      const result = await LectureServ.create(req.body);
      res.status(201).send(response("lecture created", result));
  } 

  async getAll(req, res) {
   const result = await LectureServ.getAll();
   res.status(200).send(response("All lecture", result));
  }

  async getOne(req, res) {
   const result = await LectureServ.getOne(req.params.lecture_id);
   res.status(200).send(response("lecture data", result));
  }

  async update(req, res) {
   const result = await LectureServ.update(req.params.lecture_id, req.body);
   res.status(200).send(response("lecture updated", result));
  }
  
  async delete(req, res) {
   const result = await LectureServ.delete(req.params.lecture_id);
   res.status(200).send(response("lecture deleted", result));
  }

}


module.exports = new LectureContoller();
