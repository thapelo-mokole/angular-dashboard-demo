import { UserModal } from "./user";
export interface User{
  status:boolean;
  code:number;
  message:string;
  data?:string;
}