import { JwtPayload } from './../../shared/types/jwt-payload.type';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'at-secret'
		});
	}

	validate(payload: JwtPayload) {
		return payload;
	}
}