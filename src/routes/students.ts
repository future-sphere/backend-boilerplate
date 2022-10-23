import { guard } from './../middlewares/guard';
import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
  loginStudent,
} from '../controllers/students';

const studentRouter = Router();

studentRouter.get('/', getStudents);
studentRouter.post('/', createStudent);
studentRouter.delete('/', deleteStudent);
studentRouter.put('/', guard, updateStudent);
studentRouter.get('/:id', getStudentById);
studentRouter.post('/login', loginStudent);

export default studentRouter;
