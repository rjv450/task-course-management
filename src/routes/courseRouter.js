import express from 'express';
import { createCourse, getCourseById, deleteCourse, updateCourse, getLessonsByCourseIdController, deleteLessonController, createLessonController, updateLessonController, getCourses } from '../controllers/courseController.js';
import { courseValidator, updateCourseValidator, validateCreateLesson, validateUpdateLesson } from '../utils/validators/courseValidator.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/courses', authMiddleware, courseValidator, createCourse);
router.get('/courses',authMiddleware, getCourses); 
router.get('/courses/:id', authMiddleware, getCourseById);
router.put('/courses/:id', authMiddleware, updateCourseValidator, updateCourse);
router.delete('/courses/:id', authMiddleware, deleteCourse);
router.post('/courses/:courseId/lessons', authMiddleware, validateCreateLesson, createLessonController);
router.delete('/lessons/:id', authMiddleware, deleteLessonController);
router.get('/courses/:courseId/lessons', authMiddleware, getLessonsByCourseIdController);
router.put('/courses/:courseId/lessons/:id', authMiddleware, validateUpdateLesson, updateLessonController);


export default router;
