import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class GqlUser {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  role?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  lastLogin?: Date;
}

@Resolver(() => GqlUser)
export class UsersResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [GqlUser])
  async users(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    // Try to include lastLogin if column exists; otherwise, fall back gracefully
    try {
      // Quick existence check
      const existsRows = await this.prisma.$queryRaw<{ exists: boolean }[]>`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE lower(table_name) = 'user' AND lower(column_name) = 'lastlogin'
        ) AS exists`;
      const hasLastLogin = Array.isArray(existsRows) ? Boolean(existsRows[0]?.exists) : false;

      if (hasLastLogin) {
        return this.prisma.user.findMany({
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          select: { id: true, email: true, name: true, image: true, role: true, createdAt: true, lastLogin: true },
        });
      }
    } catch {
      // ignore existence check errors and fall back
    }

    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
    });
  }

  @Query(() => Int)
  async usersCount() {
    return this.prisma.user.count();
  }

  @Mutation(() => GqlUser)
  async updateUserRole(
    @Args('userId') userId: string,
    @Args('role') role: string,
  ) {
    // Same approach: include lastLogin only if present
    try {
      const existsRows = await this.prisma.$queryRaw<{ exists: boolean }[]>`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE lower(table_name) = 'user' AND lower(column_name) = 'lastlogin'
        ) AS exists`;
      const hasLastLogin = Array.isArray(existsRows) ? Boolean(existsRows[0]?.exists) : false;
      if (hasLastLogin) {
        return this.prisma.user.update({
          where: { id: userId },
          data: { role: role as any },
          select: { id: true, email: true, name: true, image: true, role: true, createdAt: true, lastLogin: true },
        });
      }
    } catch {}

    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
      select: { id: true, email: true, name: true, image: true, role: true, createdAt: true },
    });
  }
}
