import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  createdById?: string;

  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];

  @Field(() => [Quiz], { nullable: true })
  quizzes?: Quiz[];
}

@ObjectType()
export class Lesson {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  videoUrl?: string;

  @Field(() => Course)
  course: Course;

  @Field()
  courseId: string;
}

@ObjectType()
export class Quiz {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => Int)
  order: number;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Course)
  course: Course;

  @Field()
  courseId: string;
}
