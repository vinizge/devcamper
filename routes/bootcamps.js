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

const {protect, authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootCampsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampUploadPhoto);

router.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootCamps).post(protect, authorize('publisher', 'admin'), createBootCamp);

router.route('/:id')
.get(getBootCamp)
.put(protect, authorize('publisher', 'admin'), updateBootCamp)
.delete(protect, authorize('publisher', 'admin'), deleteBootCamp);

module.exports = router;