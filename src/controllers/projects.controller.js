const fs = require("fs");
const { cloudinaryUploads } = require("../services/projects.service");

const ProjectModel = require("../db/models/project.model");
module.exports = {
  uploadProjects: async (req, res) => {
    if (req.method === "POST") {
      const path = req.file.path;
      var folderName = "images";
      const result = await cloudinaryUploads(path, folderName);
      // console.log(result);

      if (result.error) {
        console.log(error);
        res
          .status(401)
          .json({ success: 0, message: "Error when uploading", error: error });
      } else {
        const { title, description, tech_list, visit_link } = req.body;

        const data = {
          project_img: result.url,
          title: title,
          description: description,
          tech_list: tech_list,
          visit_link: visit_link,
        };
        const project = await ProjectModel(data);

        project.save((err, result) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              success: 0,
              message: "project adding failed",
              error: err,
            });
          }

          res.status(200).json({
            success: 1,
            message: "project added successfully",
            data: result,
          });
        });
      }
    }
  },

  showProjects: async (req, res) => {
    await ProjectModel.find({}).exec((error, result) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          success: 0,
          message: "something went wrong",
          error: error,
        });
      } else if (!result || result.length == 0) {
        res.status(401).json({
          success: 0,
          message: "projects not found!",
        });
      } else {
        res.status(200).json({
          success: 1,
          message: "projects found",
          data: result,
        });
      }
    });
  },

  deleteProject: async (req, res) => {
    const id = req.params.id;
    await ProjectModel.findByIdAndDelete({ _id: id }).exec((error, result) => {
      if (error) {
        console.log(error);
        res
          .status(401)
          .json({ success: 0, message: "deletation failed", error: error });
      } else if (!result || result.length == 0) {
        res.status(401).json({ success: 0, message: "projects not found" });
      } else {
        res
          .status(200)
          .json({ success: 1, message: "deleted successfully", data: result });
      }
    });
  },
};
