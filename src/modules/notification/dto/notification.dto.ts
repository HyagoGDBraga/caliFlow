import { User } from "@/modules/user/schema/userSchema";

export type notificationDto = {
  id: string;
  user_email: User;
  message: string;
};

export type notificationResponse = {
    notification: notificationDto;
}
