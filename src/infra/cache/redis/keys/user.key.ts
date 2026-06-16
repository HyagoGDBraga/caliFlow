export const userKeys = {

  all: (page: number, limit: number) => `users:all`,

  byId: (id: string) =>
    `users:${id}`,

  profile: (id: string) =>
    `users:profile:${id}`,

  update: (id: string, data: any) => 
    `users:update ${id} ${data}`,

  create: (data: any) => 
    `users:create`,

  delete: (id:string) =>
    `users: delete ${id}` 
,
  patch: (id: string, data: any) =>
    `users: patch ${id}  ${data}`
};
