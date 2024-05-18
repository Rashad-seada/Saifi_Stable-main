const path = require('path')
const {Client} = require('../../client/models/client')
const {Daily} = require('../../management/daily/model/dailyModel')
const {Consume} = require('../../sales/consumeItem/model/consumeModel')
const {InvMembership} = require('../../sales/InvMembership/model/invMembership')

//import token
const ApiErrorCode = require("../../../core/errors/apiError") 


class InqueryController {

    static async getClientInqueries (req, res) {
        try {
            {

                Client.findById(req.params.id)
                  .select("-__v")
                  .then(async (docs) => {

                    if(docs){

                        const courses = await Daily.find({clientId : req.params.id})
                        const cafateria = await Consume.find({clientId : req.params.id})
                        const invMembership = await InvMembership.findOne({clientId : req.params.id}) 
                        res.status(200).json({
                            status_code: 1,
                            message: "Got the clients successfuly",
                            data: {
                              client: docs,
                              courses: courses,
                              cafateria : cafateria,
                              membershipStatus : invMembership
                            },
                        });

                    }else {
                        res.status(404).json({
                            status_code: ApiErrorCode.notFound,
                            message: "Clinet not found",
                            data: null,
                            error : {
                                message : "Clinet not found"
                            }
                        });
                    }
                    
                   
                  })
                  .catch((error) => {
                    res.status(500).json({
                      status_code: ApiErrorCode.internalError,
                      message:
                        "There was an error when getting the client, please try again",
                      data: null,
                      error: {
                        message: error.message,
                      },
                    });
                  });
              }
        } catch (error) {
          res.status(500).json({
            status_code: ApiErrorCode.internalError,
            message: "There was a server internal error, please try again",
            data: null,
            error: {
              message: error.message,
            },
          });
        }
    }

    static async getInstructorInqueries (req, res) {}

    static async getHourseInqueries (req, res) {

    }


}

module.exports = InqueryController;