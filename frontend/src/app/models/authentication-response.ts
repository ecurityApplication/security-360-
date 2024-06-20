export  interface  AuthenticationResponse {
  accessToken?: string;
  mfaEnabled?: string;
  refreshToken?:string;
  //  enabled ?:boolean;
  //secretImageUri?: string;
  role?:string[]
  
}
