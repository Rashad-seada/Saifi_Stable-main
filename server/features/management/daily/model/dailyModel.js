const mongoose = require("mongoose");
const joi = require("joi");
const dailySchema = new mongoose.Schema({
  courseDate: {
    type: String,
    required: true,
  
  },
  clientId: {
    type : mongoose.Types.ObjectId,
    ref: "Client",
    required: true,
  }, 
  course: {
    type: String,
    require: false,
 
    
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    
  },
  instractorId: {
    type : mongoose.Types.ObjectId,
    ref: "instractor",
    required: true,
  },
  paid: {
    type: String,
    require: true,
<<<<<<< HEAD
    enum: ["paid", "pending"]
    },
=======
    enum: ["Paid", "Pending"],
   
  },
>>>>>>> 1821bcae1a9e4e60cecf3ff164535e4aad1e6fcf
  note: {
    type: String,
    require: true,
   
  },
  courseTime: {
    type: String,
    require: true,
   
  },
  hourseId : {
    type : mongoose.Types.ObjectId,
    ref: "Hourse",
    required: true,
       },
  price: {
    type:String ,
    require:true,
  
  },
  arena: {
    type:String,
    require:true,
   
  },
  membership: {
    type:String,
<<<<<<< HEAD
    enum :["individual","family"] ,
    require:true
=======
    enum :["Individual","Family"] ,
    require:true,
 
>>>>>>> 1821bcae1a9e4e60cecf3ff164535e4aad1e6fcf
  },
});

const Daily =  mongoose.model("Daily", dailySchema);

function createNewDaily(obj) {
  const schema = joi.object({
    
    courseDate:joi.string().required().min(2).max(20),
    clientId:joi.string().required().min(2).max(50),
    course:joi.string().min(2).max(20),
    status:joi.string().required(),
    instractorId:joi.string().required().min(2).max(50),
    paid:joi.string().required(),
    note:joi.string().required().min(2).max(20),
    courseTime:joi.string().required().min(2).max(20),
    hourseId:joi.string().required().min(2).max(50),
    price:joi.number().required().min(2).max(20),
    arena:joi.string().required().min(2).max(20),
    membership:joi.string().required(),

  });
  return schema.validate(obj);
}

function updateDaily(obj) {
  const schema = joi.object({
    courseDate:joi.string().required().min(2).max(20),
    clientId:joi.string().required().min(2).max(50),
    course:joi.string().min(2).max(20),
    status:joi.string().required(),
    instractorId:joi.string().required().min(2).max(50),
    paid:joi.string().required(),
    note:joi.string().required().min(2).max(20),
    courseTime:joi.string().required().min(2).max(20),
    hourseId:joi.string().required().min(2).max(50),
    price:joi.number().required().min(2).max(20),
    arena:joi.string().required().min(2).max(20),
    membership:joi.string().required(),

  });
  return schema.validate(obj);
}

module.exports = {
  Daily,
  createNewDaily,
  updateDaily
};
