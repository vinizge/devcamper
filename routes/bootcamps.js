const express = require('express');

const {getBootCamp, 
  getBootCamps,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
  bootcampUploadPhoto
 } = require('../controllers/bootcamps');

 const Bootcamp = require('../models/bootcamp');
 const advancedResults = require('../middleware/advancedResults');

 //Include other resource routers
 const courseRouter = require('./courses');
 
const router = express.Router();

const {protect} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/:id/photo').put(protect, bootcampUploadPhoto);

router.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootCamps).post(protect, createBootCamp);

router.route('/:id')
.get(getBootCamp)
.put(protect, updateBootCamp)
.delete(protect, deleteBootCamp);

module.exports = router;