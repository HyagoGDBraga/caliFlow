export const notificationKeys = {

  unread: (userId: string) =>
    `notifications:unread:${userId}`,

  all: (userId: string) =>
    `notifications:all:${userId}`,

};