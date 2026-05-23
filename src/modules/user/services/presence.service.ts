export class PresenceUserService {
  private onlineUsers = new Map<string, boolean>();

  setOnline(id: string) {
    this.onlineUsers.set(id, true);
  }

  online(id: string): boolean {
    return this.onlineUsers.has(id);
  }

  offline(id: string) {
    this.onlineUsers.delete(id);
  }

  getOnlineUsers(): string[] {
    return [...this.onlineUsers.keys()];
  }
}