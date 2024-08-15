import prisma from '../config/db.js';
import { getCache, setCache } from '../utils/cache.js';
export const createCourseService = async (title, description, userId) => {
    try {
        return await prisma.course.create({
            data: {
                title, description, user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCourseByIdService = async (id) => {
    try {
        const cacheKey = `course:${id}`;

        const cachedCourse = await getCache(cacheKey);
        if (cachedCourse) {
            return cachedCourse;
        }

        const course = await prisma.course.findUnique({
            where: { id: parseInt(id) },
            include: { lessons: true }
        });

        if (!course) {
            throw new Error('Course not found');
        }

        await setCache(cacheKey, course, 300);

        return course;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteCourseService = async (id) => {
    try {
        const course = await prisma.course.findUnique({
            where: { id: parseInt(id) },
            include: { lessons: true }
        });
        if (!course) {
            throw new Error('Course not found');
        }
        await prisma.course.delete({
            where: { id: parseInt(id) }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateCourseService = async (id, title, description) => {
    try {
        const course = await prisma.course.findUnique({
            where: { id: parseInt(id) },
            include: { lessons: true }
        });
        if (!course) {
            throw new Error('Course not found');
        }
        return await prisma.course.update({
            where: { id: parseInt(id) },
            data: { title, description }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getLessonsByCourseId = async (courseId) => {
    try {
        const parsedCourseId = parseInt(courseId, 10);
        if (isNaN(parsedCourseId)) {
            throw new Error('Invalid course ID');
        }

        const cacheKey = `lessons:${courseId}`;


        const cachedLessons = await getCache(cacheKey);
        if (cachedLessons) {
            return cachedLessons;
        }

        const lessons = await prisma.lesson.findMany({
            where: { courseId: parsedCourseId }
        });

        await setCache(cacheKey, lessons, 300);

        return lessons;
    } catch (error) {
        throw new Error(`Failed to retrieve lessons: ${error.message}`);
    }
};

export const deleteLessonById = async (id,courseId) => {
    try {
        const parsedId = parseInt(id, 10);
        const parseCourseId =parseInt(courseId, 10);
        if (isNaN(parsedId) ||isNaN(parseCourseId)) {
            throw new Error('Invalid lesson ID');
        }
        const lesson = await prisma.lesson.findUnique({
            where: { id: parsedId,courseId:parseCourseId }
        });
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        await prisma.lesson.delete({
            where: { id: parsedId }
        });
    } catch (error) {
        throw new Error(`Failed to delete lesson: ${error.message}`);
    }
};


export const createLesson = async (courseId, title, content) => {
    try {
        const parsedCourseId = parseInt(courseId, 10);
        if (isNaN(parsedCourseId)) {
            throw new Error('Invalid course ID');
        }

        const course = await prisma.course.findUnique({
            where: { id: parsedCourseId }
        });

        if (!course) {
            throw new Error('Course not found');
        }

        const lesson = await prisma.lesson.create({
            data: {
                title,
                content,
                courseId: parsedCourseId
            }
        });

        return lesson;
    } catch (error) {
        throw new Error(`Failed to create lesson: ${error.message}`);
    }
};

export const updateLesson = async (id, courseId, title, content) => {
    try {
        const parsedId = parseInt(id, 10);
        const parsedCourseId = parseInt(courseId, 10);
        if (isNaN(parsedId) || isNaN(parsedCourseId)) {
            throw new Error('Invalid lesson ID or courseId');
        }

        const lesson = await prisma.lesson.findUnique({
            where: { id: parsedId, courseId: parsedCourseId }
        });


        if (!lesson) {
            throw new Error('Lesson not found');
        }

        const updatedLesson = await prisma.lesson.update({
            where: { id: parsedId, courseId: parsedCourseId },
            data: {
                title,
                content
            }
        });

        return updatedLesson;
    } catch (error) {
        throw new Error(`Failed to update lesson: ${error.message}`);
    }
};


export const getCoursesService = async (search, page = 1, pageSize = 10) => {
    try {
        const cacheKey = `courses:${search || 'all'}:page=${page}:size=${pageSize}`;

        const cachedCourses = await getCache(cacheKey);
        if (cachedCourses) {
            return cachedCourses;
        }

        const whereClause = search
            ? {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
            : {};


        const [courses, total] = await Promise.all([
            prisma.course.findMany({
                where: whereClause,
                include: { lessons: true },
                skip: (page - 1) * pageSize,
                take: pageSize
            }),
            prisma.course.count({ where: whereClause })
        ]);


        const paginatedCourses = {
            courses,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };

        await setCache(cacheKey, paginatedCourses, 300);

        return paginatedCourses;
    } catch (error) {
        throw new Error(error.message);
    }
};