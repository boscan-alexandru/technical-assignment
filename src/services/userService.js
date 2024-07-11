import prisma from "../utils/prismaClient";

class UserService {
  async findOneByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findManyByEmail(email) {
    return prisma.user.findMany({
      where: {
        email: {
          contains: email,
        },
      },
      select: {
        id: true,
        email: true,
        avatar: true,
      },
    });
  }
}

const userService = new UserService();

export default userService;
