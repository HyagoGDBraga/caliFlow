export const partyKeys = {
  all: (page: number, limit: number) => `party: all`,

  byId: (id: string) => `party: byId: ${id}`,

  update: (id: string, data: any) => `party:update ${id} - ${data}`,

  create: (data: any) => `party: create ${data}`,
};
