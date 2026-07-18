export type prevState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type prevUserRegData = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      activeStatus: "ACTIVE" | string;
      role: "USER" | string;
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
};
