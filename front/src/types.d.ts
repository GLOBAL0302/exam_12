export interface IUser {
  _id: string;
  email: string;
  password: string;
  token: string;
  displayName: string;
  avatar: string;
  role: string;
  googleId: string;
}

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface IRegisterMutation {
  email: string;
  password: string;
  avatar: string | null;
  displayName: string;
}

export interface ILoginMutation {
  email: string;
  password: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}

export interface IGalleryMutation {
  title: string;
  image: string | null;
}

export interface IGallery extends IGalleryMutation {
  user: IUser;
  _id: string;
}
