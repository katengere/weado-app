export interface User {
  _id: string;
  name: string;
  password: string;
  position: string;
  role: string;
  phoneNo: string;
  user_Img?: string | File
}
