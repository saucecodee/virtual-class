const ClassServ = require("./../services/class.service");
 
const response = require("./../utils/response");


class ClassContoller {

   async create(req, res) {
      const result = await ClassServ.create(req.body);
      res.status(201).send(response("class created", result));
  } 

  async getAll(req, res) {
   const result = await ClassServ.getAll();
   res.status(200).send(response("All class", result));
  }

  async getOne(req, res) {
   const result = await ClassServ.getOne(req.params.class_id);
   res.status(200).send(response("class data", result));
  }

  async update(req, res) {
   const result = await ClassServ.update(req.params.class_id, req.body);
   res.status(200).send(response("class updated", result));
  }
  
  async delete(req, res) {
   const result = await ClassServ.delete(req.params.class_id);
   res.status(200).send(response("class deleted", result));
  }

}


module.exports = new ClassContoller();
