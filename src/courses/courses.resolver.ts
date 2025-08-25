import { Resolver, Query, Args, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Lesson } from './courses.types';
import { Int } from '@nestjs/graphql';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Course])
  async courses() {
    return this.prisma.course.findMany({
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        quizzes: {
          orderBy: { order: 'asc' }
        },
        createdBy: true,
      }
    });
  }

  @Query(() => Course, { nullable: true })
  async course(@Args('slug') slug: string) {
    return this.prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        quizzes: {
          orderBy: { order: 'asc' }
        },
        createdBy: true,
      }
    });
  }

  @Mutation(() => Course)
  async createCourse(
    @Args('title') title: string,
    @Args('description') description: string,
    @Args('price', { type: () => Int }) price: number,
    @Args('slug') slug: string,
    @Args('createdById') createdById: string,
    @Args('avatar', { nullable: true }) avatar?: string,
  ) {
    console.log('cehckec create by id', createdById)
    // Ensure unique slug
    const exists = await this.prisma.course.findUnique({ where: { slug } });
    if (exists) {
      throw new Error('Slug already exists');
    }
    return this.prisma.course.create({
      data: {
        title,
        description,
        price,
        slug,
        avatar,
        createdBy: { connect: { id: createdById } },
      },
    });
  }

  @ResolveField(() => [Lesson])
  async lessons(@Parent() course: Course) {
    return this.prisma.lesson.findMany({
      where: { courseId: course.id },
      orderBy: { order: 'asc' }
    });
  }
}
