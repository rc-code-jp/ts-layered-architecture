const jwt = require('jsonwebtoken');

export function generateAccessToken(userId: number) {
  return jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '5m',
    },
  );
}

export function generateRefreshToken(userId: number, jti: string) {
  return jwt.sign(
    {
      userId: userId,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '24h',
    },
  );
}

export function generateTokens(userId: number, jti: string) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId, jti);

  return {
    accessToken,
    refreshToken,
  };
}
