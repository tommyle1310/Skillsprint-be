export declare class Course {
    id: string;
    title: string;
    slug: string;
    avatar?: string;
    description: string;
    price: number;
    createdAt: Date;
    lessons?: Lesson[];
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
