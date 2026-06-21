export const clientIAkeys = {
  all: (page: number, limit: number) => `clientIA: all`,
  
  create: (data: any) => `clientIA:create ${data}`,

  byId: (id: string) => `clientIA:byId`,
  
  delete: (id: string) => `clientIA:delete`
};


