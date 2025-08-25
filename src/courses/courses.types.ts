import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field(() => [Lesson], { nullable: true })
  lessons?: Lesson[];
}

@ObjectType()
export class Lesson {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
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
