

export interface IAuthenticationService{
    loginWithEmail(email:string, password:string);

    registerWithEmail(email:string, password:string);

    getStatus();

    logOut();
}