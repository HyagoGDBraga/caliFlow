import { UserRepository } from "./../repository/userRepository";
import { AppError } from "@/decorators/Error.decorator";
import { UserService } from "./userService";
import { User } from "../schema/userSchema";

export class FriendShipService {
  private readonly userService: UserService;
  private readonly userRepository: UserRepository;
  constructor(userService: UserService, userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userService = userService;
  }
  async addFriend(userId: string, friendId: string) {
  try {
    if (!userId || !friendId) {
      throw new AppError(`Forneça o id do amigo`);
    }

    const user =
      await this.userRepository.getUserById(userId);

    const friend =
      await this.userRepository.getUserById(friendId);

    if (!user) {
      throw new AppError(`Usuário não encontrado`, 404);
    }

    if (!friend) {
      throw new AppError(`Amigo não encontrado`, 404);
    }

    user.friends ??= [];
    friend.friends ??= [];

    const alreadyFriend = user.friends.some(
      (f) => f.id === friend.id,
    );

    if (alreadyFriend) {
      throw new AppError(`Amigo já adicionado`, 400);
    }

    user.friends.push(friend);
    friend.friends.push(user);

    await this.userRepository.updateUser(user, userId);
    await this.userRepository.updateUser(friend, friendId);

    return user;

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new AppError(
      `Não foi possível adicionar o amigo`,
      400,
    );
  }
}


async removeFriend(userId: string, friendId: string) {
  try {
    if (!userId || !friendId) {
      throw new AppError(`Forneça os ids`);
    }

    const user =
      await this.userRepository.getUserById(userId);

    const friend =
      await this.userRepository.getUserById(friendId);

    if (!user) {
      throw new AppError(`Usuário não encontrado`, 404);
    }

    if (!friend) {
      throw new AppError(`Amigo não encontrado`, 404);
    }

    user.friends ??= [];
    friend.friends ??= [];

    const isFriend = user.friends.some(
      (f) => f.id === friend.id,
    );

    if (!isFriend) {
      throw new AppError(`Usuário não é amigo`, 400);
    }

    // remove dos dois lados
    user.friends = user.friends.filter(
      (f) => f.id !== friend.id,
    );

    friend.friends = friend.friends.filter(
      (f) => f.id !== user.id,
    );

    await this.userRepository.updateUser(user, userId);
    await this.userRepository.updateUser(friend, friendId);

    return user;

  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new AppError(
      `Não foi possível remover o amigo`,
      400,
    );
  }
}
}
