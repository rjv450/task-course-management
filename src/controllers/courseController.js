import { createCourseService, getCourseByIdService, deleteCourseService, updateCourseService, getLessonsByCourseId, deleteLessonById, createLesson, updateLesson, getCoursesService } from '../services/courseService.js'

export const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user?.userId;
        const course = await createCourseService(title, description, userId);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await getCourseByIdService(id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteCourseService(id);
        res.status(204).end();
    } catch (error) {
        if (error.message.includes('Course not found')) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.status(500).json({ error: `Failed to delete course: ${error.message}` });
        }
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const course = await updateCourseService(id, title, description);
        res.status(200).json(course);
    } catch (error) {
        if (error.message.includes('Course not found')) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.status(500).json({ error: `Failed to delete course: ${error.message}` });
        }
    }
};

export const getLessonsByCourseIdController = async (req, res) => {
    try {
        const { courseId } = req.params;

        const lessons = await getLessonsByCourseId(courseId);

        if (lessons.length === 0) {
            return res.status(404).json({ error: 'No lessons found for this course' });
        }

        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve lessons: ${error.message}` });
    }
};


export const deleteLessonController = async (req, res) => {
    try {
        const { id,courseId } = req.params;
        await deleteLessonById(id,courseId);
        res.status(204).end();
    } catch (error) {
        if (error.message.includes('Lesson not found')) {
            res.status(404).json({ error: 'Lesson not found' });
        } else {
            res.status(500).json({ error: `Failed to delete lesson: ${error.message}` });
        }
    }
};


export const updateLessonController = async (req, res) => {
    try {


        const { id, courseId } = req.params;
        const { title, content } = req.body;

        const updatedLesson = await updateLesson(id, courseId, title, content);

        res.status(200).json(updatedLesson);
    } catch (error) {
        if (error.message.includes('Lesson not found')) {
            res.status(404).json({ error: 'Lesson not found' });
        } else {
            res.status(500).json({ error: `Failed to update lesson: ${error.message}` });
        }
    }
};


export const createLessonController = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, content } = req.body;

        const lesson = await createLesson(courseId, title, content);

        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ error: `Failed to create lesson: ${error.message}` });
    }
};
export const getCourses = async (req, res) => {
    try {
      const { search } = req.query;
      const page = parseInt(req.query.page) || 1; 
      const pageSize = parseInt(req.query.pageSize) || 10; 
  
      const courses = await getCoursesService(search, page, pageSize);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };