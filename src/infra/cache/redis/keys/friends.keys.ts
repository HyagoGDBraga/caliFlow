export const friendKey = {
  allFriends: () => "friend:all",

  deleteFriends: (id: string) => `friend:delete${id}`,
};
