import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredintialsDto: AuthCredentialsDto): Promise<void> {
        //

        const salt = await bcrypt.genSalt();
        console.log('TCL: UserRepository -> salt', salt);

        const { username, password } = authCredintialsDto;
        const exist = await this.findOne({ username });
        if (exist) {
            console.log('TCL: UserRepository -> exist', exist);
            throw new ConflictException('this user is already taken!');
        }
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        console.log('TCL: UserRepository -> user.password', user.password);
        console.log('user:::', user);

        try {
            await user.save();

        } catch (error) {
            return error;
        }

    }
    // async validationPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    //     const { username, password } = authCredentialsDto;
    //     const user = await this.findOne({ username });

    //     if (user && user.validatePassword(password)) {
    //         return user.username;
    //     } else {
    //         return null;
    //     }
    // }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
