const express = require('express');
const router = new express.Router();
const {uploadProjects,showProjects,deleteProject} = require('../controllers/projects.controller')
const {upload} = require('../services/projects.service')

router.post('/uploadProject',upload.single("img"),uploadProjects)
router.get('/getProjects',showProjects)
router.post('/deleteProject/:id',deleteProject)

module.exports = router;