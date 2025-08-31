export interface IUserListService{
    getAllUsers():Promise<{id:string,name:string,email:string}[]>;
    createTaskForUser(userId:string,title:string,description:string):Promise<{message:string}>;
}