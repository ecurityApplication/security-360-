export interface ChangePasswordReset {
    email:string;
    currentPassword:string;
    newPassword:string;
    confirmationPassword:string;
}