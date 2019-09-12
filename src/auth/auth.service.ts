import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        console.log('TCL: AuthService -> signIn -> result', username);
        if (!username) {
            throw new UnauthorizedException('user name or password is incorrect');
        } else {
            console.log(`Welcome Mr: ${username}`);
        }
        // return result;
    }
}
