const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");
const seed = async (numUser = 3, numPlaylist = 5) => {
  for (let i = 0; i < numUser; i++) {
    const playlists = Array.from({ length: numPlaylist }, () => ({
      name: faker.music.album(),
      description: faker.lorem.lines(2),
    }));
    const user = await prisma.user.create({
      data: {
        username: faker.internet.displayName(),
        playlists: { create: playlists },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });