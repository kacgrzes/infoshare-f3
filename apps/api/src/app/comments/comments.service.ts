import { prisma } from '../prisma'

export const commentsService = {
  getTweetComments: async (tweetId: string) => {
    const comments = await prisma.comment.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
            name: true,
          },
        },
      },
      where: {
        tweetId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return comments
  },
  create: async ({ tweetId, text, authorId }) => {
    return await prisma.comment.create({
      data: {
        text,
        tweetId,
        authorId,
      },
      select: {
        createdAt: true,
        id: true,
        text: true,
        tweetId: true,
        authorId: true,
      },
    });
  },
  delete: async ({ commentId }) => {
    return await prisma.comment.delete({
      where: {
        id: commentId
      }
    })
  },
  findUnique: async ({ commentId }) => {
    return await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        authorId: true,
      },
    })
  }
}