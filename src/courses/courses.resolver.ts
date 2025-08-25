import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Lesson } from './courses.types';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Course])
  async courses() {
    return this.prisma.course.findMany({
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        }
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
        }
      }
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
