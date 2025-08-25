import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Resolver()
export class QuizzesResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation(() => String)
  async createQuiz(
    @Args('courseId') courseId: string,
    @Args('title') title: string,
    @Args('questions', { type: () => String }) questionsJson: string,
    @Args('order', { type: () => Int, nullable: true }) order?: number,
  ) {
    const parsed = JSON.parse(questionsJson);
    const nextOrder =
      order ?? (await this.prisma.quiz.count({ where: { courseId } }));
    const q = await this.prisma.quiz.create({
      data: { courseId, title, questions: parsed, order: nextOrder },
    });
    return q.id;
  }

  @Mutation(() => Boolean)
  async updateQuiz(
    @Args('id') id: string,
    @Args('title', { nullable: true }) title?: string,
    @Args('questions', { type: () => String, nullable: true }) questionsJson?: string,
    @Args('order', { type: () => Int, nullable: true }) order?: number,
    @Args('visible', { nullable: true }) visible?: boolean,
  ) {
    const data: any = { title, order, visible };
    if (questionsJson) data.questions = JSON.parse(questionsJson);
    await this.prisma.quiz.update({ where: { id }, data });
    return true;
  }

  @Mutation(() => Boolean)
  async deleteQuiz(@Args('id') id: string) {
    await this.prisma.quiz.delete({ where: { id } });
    return true;
  }

  @Mutation(() => Boolean)
  async reorderQuizzes(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
  ) {
    await this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.quiz.update({ where: { id }, data: { order: index } }),
      ),
    );
    return true;
  }
}


