export const userKeys = {

  all: (page: number, limit: number) => `users:all`,

  byId: (id: string) =>
    `users:${id}`,

  profile: (id: string) =>
    `users:profile:${id}`,

  update: (id: string, data: any) => 
    `users:update`,

  create: (data: any) => 
    `users:create`,

  delete: (id:string) =>
    `users: delete` 
};
