export type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    profile: {
      id: string;
      userId: string;
      profilePhoto: string;
      bio: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};
