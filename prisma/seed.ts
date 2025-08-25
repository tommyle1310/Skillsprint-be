import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.progress.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.order.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.traffic.deleteMany();

  // Create demo users
  const user1 = await prisma.user.create({
    data: {
      email: 'demo@skillsprint.com',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'student@skillsprint.com',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
      name: 'Student User',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  });

  // Create Course A: Video Course
  const courseA = await prisma.course.create({
    data: {
      title: 'Complete Web Development Bootcamp',
      slug: 'web-development-bootcamp',
      description: 'Learn HTML, CSS, JavaScript, and React from scratch. Build real-world projects and become a full-stack developer.',
      price: 9900, // $99.00
      type: 'video',
      avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
    }
  });

  // Create Course B: Quiz Course
  const courseB = await prisma.course.create({
    data: {
      title: 'JavaScript Fundamentals Quiz',
      slug: 'javascript-fundamentals',
      description: 'Test your JavaScript knowledge with interactive quizzes. Perfect for beginners and intermediate developers.',
      price: 4900, // $49.00
      type: 'quiz',
      avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
    }
  });

  // Create lessons for Course A (Video Course)
  const lesson1A = await prisma.lesson.create({
    data: {
      courseId: courseA.id,
      title: 'Introduction to HTML',
      order: 1,
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
      avatar: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop'
    }
  });

  const lesson2A = await prisma.lesson.create({
    data: {
      courseId: courseA.id,
      title: 'CSS Styling Basics',
      order: 2,
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    }
  });

  const lesson3A = await prisma.lesson.create({
    data: {
      courseId: courseA.id,
      title: 'JavaScript Fundamentals',
      order: 3,
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
      avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
    }
  });

  const lesson4A = await prisma.lesson.create({
    data: {
      courseId: courseA.id,
      title: 'React Components',
      order: 4,
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
      avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    }
  });

  const lesson5A = await prisma.lesson.create({
    data: {
      courseId: courseA.id,
      title: 'Final Project',
      order: 5,
      videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
      avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    }
  });

  // Create lessons for Course B (Quiz Course)
  const lesson1B = await prisma.lesson.create({
    data: {
      courseId: courseB.id,
      title: 'Variables and Data Types',
      order: 1,
      avatar: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
    }
  });

  const quiz1B = await prisma.quiz.create({
    data: {
      lessonId: lesson1B.id,
      questions: [
        {
          question: 'Which keyword is used to declare a variable in JavaScript?',
          options: ['var', 'let', 'const', 'All of the above'],
          correctAnswer: 3
        },
        {
          question: 'What is the data type of null in JavaScript?',
          options: ['object', 'null', 'undefined', 'number'],
          correctAnswer: 0
        },
        {
          question: 'Which of the following is a primitive data type?',
          options: ['array', 'object', 'string', 'function'],
          correctAnswer: 2
        }
      ]
    }
  });

  const lesson2B = await prisma.lesson.create({
    data: {
      courseId: courseB.id,
      title: 'Functions and Scope',
      order: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    }
  });

  const quiz2B = await prisma.quiz.create({
    data: {
      lessonId: lesson2B.id,
      questions: [
        {
          question: 'What is a function declaration?',
          options: ['A way to call functions', 'A way to define functions', 'A way to return values', 'A way to pass parameters'],
          correctAnswer: 1
        },
        {
          question: 'What is the scope of a variable declared with "let"?',
          options: ['Global scope', 'Function scope', 'Block scope', 'Module scope'],
          correctAnswer: 2
        },
        {
          question: 'How do you call a function named "myFunction"?',
          options: ['myFunction()', 'call myFunction', 'function myFunction', 'myFunction.call()'],
          correctAnswer: 0
        }
      ]
    }
  });

  const lesson3B = await prisma.lesson.create({
    data: {
      courseId: courseB.id,
      title: 'Arrays and Objects',
      order: 3,
      avatar: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=200&fit=crop'
    }
  });

  const quiz3B = await prisma.quiz.create({
    data: {
      lessonId: lesson3B.id,
      questions: [
        {
          question: 'How do you access the first element of an array?',
          options: ['array[0]', 'array.first', 'array[1]', 'array.first()'],
          correctAnswer: 0
        },
        {
          question: 'What method adds an element to the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 0
        },
        {
          question: 'How do you access an object property?',
          options: ['object.property', 'object[property]', 'Both A and B', 'object.get(property)'],
          correctAnswer: 2
        }
      ]
    }
  });

  const lesson4B = await prisma.lesson.create({
    data: {
      courseId: courseB.id,
      title: 'DOM Manipulation',
      order: 4,
      avatar: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    }
  });

  const quiz4B = await prisma.quiz.create({
    data: {
      lessonId: lesson4B.id,
      questions: [
        {
          question: 'What does DOM stand for?',
          options: ['Document Object Model', 'Data Object Model', 'Dynamic Object Model', 'Document Oriented Model'],
          correctAnswer: 0
        },
        {
          question: 'How do you select an element by ID?',
          options: ['getElementById()', 'querySelector()', 'getElementsByTagName()', 'All of the above'],
          correctAnswer: 3
        },
        {
          question: 'What method creates a new element?',
          options: ['createElement()', 'newElement()', 'addElement()', 'makeElement()'],
          correctAnswer: 0
        }
      ]
    }
  });

  const lesson5B = await prisma.lesson.create({
    data: {
      courseId: courseB.id,
      title: 'Final Assessment',
      order: 5,
      avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    }
  });

  const quiz5B = await prisma.quiz.create({
    data: {
      lessonId: lesson5B.id,
      questions: [
        {
          question: 'What is the result of 2 + "2" in JavaScript?',
          options: ['4', '22', 'NaN', 'Error'],
          correctAnswer: 1
        },
        {
          question: 'Which method removes the last element from an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 1
        },
        {
          question: 'What is the purpose of "use strict"?',
          options: ['To enable strict mode', 'To disable strict mode', 'To import modules', 'To export functions'],
          correctAnswer: 0
        }
      ]
    }
  });

  // Create demo leads
  await prisma.lead.createMany({
    data: [
      { email: 'lead1@example.com' },
      { email: 'lead2@example.com' },
      { email: 'lead3@example.com' },
      { email: 'lead4@example.com' },
      { email: 'lead5@example.com' }
    ]
  });

  // Create demo order
  await prisma.order.create({
    data: {
      userId: user1.id,
      courseId: courseA.id,
      amount: 9900,
      status: 'paid'
    }
  });

  // Create some progress for user1
  await prisma.progress.create({
    data: {
      userId: user1.id,
      lessonId: lesson1A.id,
      completed: true,
      score: 100
    }
  });

  // Initialize traffic counter
  await prisma.traffic.create({
    data: {
      count: 0
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${await prisma.user.count()} users`);
  console.log(`📚 Created ${await prisma.course.count()} courses`);
  console.log(`📝 Created ${await prisma.lesson.count()} lessons`);
  console.log(`❓ Created ${await prisma.quiz.count()} quizzes`);
  console.log(`📧 Created ${await prisma.lead.count()} leads`);
  console.log(`💰 Created ${await prisma.order.count()} orders`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
