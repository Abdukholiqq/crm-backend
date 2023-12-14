export interface AdminRequestbody {
  username: string;
  lastname: string;
  password: string;
}
export interface UserRequestbody {
  username: string;
  lastname: string;
  password: string;
  newPassword: string;
}
export interface GroupData {
  group_name: string;
  routing: string;
  lesson_days: string;
  lesson_time: string;
  teacherId: number;
}
export interface AddTeacherData {
  username: string;
  phone_number: number;
  routing: string;
  password: string;
}
export interface TeacherLogin {
  username: string;
  password: string;
}
export interface StudentData {
  username: string;
  phone: number;
  parent_name: string;
  parent_phone: number;
  routing: string;
  group_name: string;
}
export interface PaymentData {
  phone: number;
  routing: string;
  mounth: string;
  payment_price: number;
  status: boolean;
  groupId: number;
  teacherId: number;
  studentId: number;
}
