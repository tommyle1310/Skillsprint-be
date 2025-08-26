import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Lesson } from '../courses/courses.types';

@Resolver(() => Lesson)
export class LessonsResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => Lesson)
  async createLesson(
    @Args('courseId') courseId: string,
    @Args('title') title: string,
    @Args('order', { type: () => Int, nullable: true }) order?: number,
    @Args('videoUrl', { nullable: true }) videoUrl?: string,
    @Args('avatar', { nullable: true }) avatar?: string,
  ) {
    const nextOrder =
      order ?? (await this.prisma.lesson.count({ where: { courseId } })) + 1;
    return this.prisma.lesson.create({
      data: { courseId, title, order: nextOrder, videoUrl, avatar },
    });
  }

  @Mutation(() => Lesson)
  async updateLesson(
    @Args('id') id: string,
    @Args('title', { nullable: true }) title?: string,
    @Args('order', { type: () => Int, nullable: true }) order?: number,
    @Args('videoUrl', { nullable: true }) videoUrl?: string,
    @Args('avatar', { nullable: true }) avatar?: string,
    @Args('visible', { nullable: true }) visible?: boolean,
  ) {
    return this.prisma.lesson.update({
      where: { id },
      data: { title, order, videoUrl, avatar, visible },
    });
  }

  @Mutation(() => Boolean)
  async deleteLesson(@Args('id') id: string) {
    await this.prisma.lesson.delete({ where: { id } });
    return true;
  }

  @Mutation(() => Boolean)
  async reorderLessons(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
  ) {
    await this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.lesson.update({ where: { id }, data: { order: index + 1 } }),
      ),
    );
    return true;
  }

  @Mutation(() => Boolean)
  async toggleLessonVisibility(@Args('id') id: string, @Args('visible') visible: boolean) {
    await this.prisma.lesson.update({ where: { id }, data: { visible } });
    return true;
  }
}


