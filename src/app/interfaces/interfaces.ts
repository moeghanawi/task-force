export interface RegisterInfo {
  name?: string;
  email: string;
  password: string;
  isLoggedIn?: boolean;
}

// export interface LoginInfo {
//   email: string;
//   password: string;
// }

export interface LoginResponse {
  user: { name: string };
  token: string;
  isLoggedIn?: boolean;
}

export interface Task {
  task: any;
  completed: boolean;
  userId?: string;
  timestamp?: Date;
  _id: string;
}

export interface ConfirmationModalData {
  message: string;
  buttonName?: string;
  buttonColor?: string;
}
