const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
        project_img: {
            type: String,
            trim:true,
            required: true
        },
          title:{
            type: String,
            trim:true,
            required: true
          },
          description:{
              type: String,
              trim:true,
              required: true
          },
          tech_list:Array,
          visit_link: {
              type: String,
              required: true,
              trim:true,
          }
},{timestamps: true})

module.exports = mongoose.model('Project',projectSchema);