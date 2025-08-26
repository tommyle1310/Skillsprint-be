export declare class Course {
    id: string;
    title: string;
    slug: string;
    avatar?: string;
    description: string;
    price: number;
    purchaseCount: number;
    createdAt: Date;
    createdById?: string;
    lessons?: Lesson[];
    quizzes?: Quiz[];
}
export declare class Lesson {
    id: string;
    title: string;
    order: number;
    avatar?: string;
    videoUrl?: string;
    course: Course;
    courseId: string;
}
export declare class Quiz {
    id: string;
    title: string;
    order: number;
    avatar?: string;
    course: Course;
    courseId: string;
}
