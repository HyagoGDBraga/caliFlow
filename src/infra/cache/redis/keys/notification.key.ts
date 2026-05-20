export const notificationKey = {
  all: (page: number, limit: number) => {
    `notification: all`;
  },
  create: (data: any) => {
    `notification: create ${data}`;
  },
  byId: (id: string) => {
    `notification: byId${id}`;
  },
};
