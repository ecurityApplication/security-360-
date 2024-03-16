export interface PasswordResetToken {
  tokenId: string;
  token: string;
  expirationTime: Date;
  EXPIRATION_TIME: number;
}

