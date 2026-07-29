export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    profilePhoto: string | null;
    bio: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};
export type UserResponse = {
  success: boolean;
  message: string;
  data: {
    result: User;
  };
};

export type NavbarProps = {
  user: UserResponse;
};
export type UserMenuProps = {
  user: User;
};
