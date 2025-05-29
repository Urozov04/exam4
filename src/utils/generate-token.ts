import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken = async (payload: object) => {
    return this.jwtService.signAsync(payload, {
      secret: config.ACCESS_SECRET,
      expiresIn: config.ACCESS_TIME,
    });
  };

  generateRefreshToken = async (payload: object) => {
    return this.jwtService.signAsync(payload, {
      secret: config.REFRESH_SECRET,
      expiresIn: config.REFRESH_TIME,
    });
  };
}
