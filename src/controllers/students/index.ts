import { Request, Response } from 'express';
import { prisma } from '../..';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;

export const getStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany({
    include: {
      orders: {
        select: {
          id: true,
          products: true,
        },
      },
    },
  });
  res.json(students);
};

export const createStudent = async (req: Request, res: Response) => {
  const { firstName, lastName, age, grade, email, password } = req.body;
  const existingEmail = await prisma.student.findFirst({
    where: {
      email,
    },
  });
  if (existingEmail) {
    return res.json({
      message: 'Email already exists',
    });
  }
  const student = await prisma.student.create({
    data: {
      firstName,
      lastName,
      age: Number(age),
      grade,
      email,
      password: bcrypt.hashSync(password),
    },
  });
  res.json(student);
};

export const loginStudent = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!secretKey) {
    return res.json({
      message: 'JWT_SECRET is not set',
    });
  }

  const student = await prisma.student.findFirst({
    where: {
      email,
    },
  });
  if (!student) {
    return res.json({
      message: 'We cannot find your account associated with this email',
    });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, student.password);
  if (!isPasswordCorrect) {
    return res.json({
      message: 'Incorrect password',
    });
  }

  const token = jwt.sign(
    {
      id: student.id,
    },
    secretKey,
    {
      expiresIn: '1d',
    }
  );
  res.json(token);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const existingOrder = await prisma.order.findFirst({
      where: {
        studentId: Number(id),
      },
    });
    if (existingOrder) {
      return res.json({
        message: 'Cannot delete student with existing order',
      });
    }
    const existingStudent = await prisma.student.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!existingStudent) {
      return res.json({
        message: 'Student does not exist',
      });
    }
    const student = await prisma.student.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(student);
  } catch (error: any) {
    res.json({
      message: 'Error deleting student',
    });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id, firstName, lastName, age, grade } = req.body;

  const requestStudentId = req.headers.authorization?.split(' ')[1];
  if (requestStudentId !== id) {
    return res.json({
      message: 'You are not authorized to update this student',
    });
  }

  const existingStudent = await prisma.student.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (!existingStudent) {
    return res.json({
      message: 'Student does not exist',
    });
  }
  const student = await prisma.student.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName,
      lastName,
      age: Number(age),
      grade,
    },
  });
  res.json(student);
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await prisma.student.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      orders: {
        select: {
          id: true,
          products: true,
        },
      },
    },
  });
  if (!student) {
    return res.json({
      message: 'Student does not exist',
    });
  }
  res.json(student);
};
