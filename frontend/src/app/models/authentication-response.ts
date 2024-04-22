export  interface  AuthenticationResponse {
  accessToken?: string;
  mfaEnabled?: string;
  refreshToken?:string;
  //secretImageUri?: string;
  role?:string[]
  
}
