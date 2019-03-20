import { AdgroupsDialogElement } from "./adgroupview.modal";

export interface AdgroupsElement {
    ID?: string;
    NAME?: string;
    SKUNAME?:string;
    ISACTIVE?:boolean;
    IMAGE_URL?:string;
    PATH?:string;
    F_PATH?:string;
    F_NAME?:string;
    I_DATE?:string;
    U_DATE?:string;
    ACTIONTYPE?:string;
    KEYWORD?:AdgroupsDialogElement[];
}