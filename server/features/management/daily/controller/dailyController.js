const { Daily, createNewDaily, updateDaily } = require("../model/dailyModel");
const ApiErrorCode = require("../../../../core/errors/apiError");

class dailyController {
  static async getAllDaily(req, res) {
    // Pagination parameters
    const pageSize = 10; // Number of documents per page

    // Calculate the number of documents to skip
    const skip = (req.query.page - 1) * pageSize;

    const regexQuery = new RegExp(req.query.query, "i"); // Case-insensitive regex query

    Daily.find({
      $or: [
        { type: { $regex: regexQuery } },
        { course: { $regex: regexQuery } },
      ],
    })
    .populate("hourseId")
    .populate("clientId")
    .populate("instractorId")      .skip(skip) // Skip documents
      .limit(pageSize)

      .then(async (docs) => {
        if (docs) {
          const totalRecords = await Daily.countDocuments();

          const maxPages = Math.ceil(totalRecords / pageSize);

          res.status(200).json({
            status_code: 0,
            message: "Success to Get All Daily ",
            Daily: {
              current_page: parseInt(req.query.page) || 1,
              max_pages: maxPages,
              data: docs,
            },
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: error.message,
            data: null,
            error: {
              message: error.message,
            },
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "There was a server internal error, please try again",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
  static async getDailyById(req, res) {
    await Daily.findById(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: 0,
            message: "Success to get daily By Id",
            data: docs,
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: " Id Not Found",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: "There was a server internal error, please try again",
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
  static async createNewDaily(req, res) {
    const { error } = createNewDaily(req.body);
    if (error) {
      res.status(400).json({
        status_code: ApiErrorCode.validation,
        message: error.message,
        data: null,
        error: {
          message: error.message,
        },
      });
    } else {
      const daily = await Daily.findOne({ course: req.body.course });
      if (daily) {
        res.status(402).json({
          status_code: ApiErrorCode.internalError,
          message: " Course is already defind",
          data: daily,
        });
      } else {
        new Daily({
          courseDate: req.body.courseDate,
          clientId: req.body.clientId,
          course: req.body.course,
          status: req.body.status,
          instractorId: req.body.instractorId,
          paid: req.body.paid,
          note: req.body.note,
          courseTime: req.body.courseTime,
          hourseId: req.body.hourseId,
          price: req.body.price,
          arena: req.body.arena,
          membership: req.body.membership,
        })
          .save()
          .then((docs) => {
            if (docs) {
              res.status(200).json({
                status_code: 1,
                message: " Success to create New daily  ",
                data: docs,
              });
            } else {
              res.status(402).json({
                status_code: ApiErrorCode.notFound,
                message: error.message,
                data: null,
                error: {
                  message: error.message,
                },
              });
            }
          })
          .catch((error) => {
            res.status(400).json({
              status_code: ApiErrorCode.internalError,
              message: error.message,
              data: null,
              error: {
                message: error.message,
              },
            });
          });
      }
    }
  }
  static async updateDaily(req, res) {
    const { error } = updateDaily(req.body);
    if (error) {
      res.status(400).json({
        status_code: ApiErrorCode.validation,
        message: error.message,
        data: null,
        error: {
          message: error.message,
        },
      });
    } else {
      await Daily.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            courseDate: req.body.courseDate,
            clientId: req.body.clientName,
            course: req.body.course,
            status: req.body.status,
            instractorId: req.body.instractor,
            paid: req.body.paid,
            note: req.body.note,
            courseTime: req.body.courseTime,
            hourseId: req.body.hourseName,
            price: req.body.price,
            arena: req.body.arena,
            membership: req.body.membership,
          },
        },
        { new: true }
      )
        .then((docs) => {
          if (docs) {
            res.status(200).json({
              status_code: 1,
              message: " Success to update daily ",
              data: docs,
            });
          } else {
            res.status(404).json({
              status_code: ApiErrorCode.notFound,
              message: "Id is Not Defined",
              data: null,
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status_code: ApiErrorCode.internalError,
            message: error.message,
            data: null,
            error: {
              message: error.message,
            },
          });
        });
    }
  }
  static async DeleteDailyById(req, res) {
    await Daily.findByIdAndDelete(req.params.id)
      .then((docs) => {
        if (docs) {
          res.status(200).json({
            status_code: ApiErrorCode.notFound,
            message: " Success to Deleted",
            data: [],
          });
        } else {
          res.status(404).json({
            status_code: ApiErrorCode.notFound,
            message: " Id is not Defind",
            data: null,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          status_code: ApiErrorCode.internalError,
          message: error.message,
          data: null,
          error: {
            message: error.message,
          },
        });
      });
  }
}

module.exports = {
  dailyController,
};