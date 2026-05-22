import { User } from "@/modules/user/schema/userSchema";

export type notificationDto = {
  id: string;
  user_email: User;
  message: string;
};

export type notificationResponseGet = {
    notification: notificationDto[];
}

export type notificationResponseCreate = {
    notification: notificationDto;
}

export type notificationResponseGetById = {
    notification: notificationDto;
}

export type notificationResponseUpdate = {
    notification: notificationDto;
}

export type notificationResponsePatch = {
    notification?: notificationDto;
}

