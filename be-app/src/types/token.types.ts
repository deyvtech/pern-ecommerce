export interface TokenPayload {
	sub: string;
	role: "customer" | "admin";
	name: string;
}

export interface RefreshTokenValue {
	user_id: string;
	token_hash: string;
	jti: string;
	ip_address: string;
	user_agent: string;
}


export interface PersistRefreshTokenParams {
  userId: string;
  refreshToken: string;
  jti: string;
  ip: string;
  userAgent: string;
}