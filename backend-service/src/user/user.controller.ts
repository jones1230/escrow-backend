import {
    Body,
    Controller,
    Get,
    ParseUUIDPipe,
    Post,
    Param,
    NotFoundException,
    Patch,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/userResponse.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { errorLogColorPrefix } from '../common/error.config';
import { errorLogColorSuffix } from '../common/error.config';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * FEAT: Add try catch to all routes or set up a global exception handler
     */
    @Get()
    async findAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.userService.findAll();
        return plainToInstance(UserResponseDto, users, {
            excludeExtraneousValues: true,
        });
    }

    @Get(':id')
    async getUserById(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<UserResponseDto> {
        const user = await this.userService.getUserById(id);
        if (user === null) {
            throw new NotFoundException(`User with id ${id} not Found`);
        }
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    @Post()
    async createNewUser(
        @Body() createUserData: CreateUserDto,
    ): Promise<UserResponseDto> {
        try {
            const newUser = await this.userService.createUser(createUserData);
            return plainToInstance(UserResponseDto, newUser, {
                excludeExtraneousValues: true,
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002' && e.meta) {
                    const { target, modelName } = e.meta;
                    console.error(
                        `${errorLogColorPrefix}Unique constraint violation, a new user conflict for field "${target as string}" on model "${modelName as string}"${errorLogColorSuffix}`,
                    );
                }
            }
            throw new HttpException(
                'User with email exists',
                HttpStatus.CONFLICT,
            );
        }
    }

    @Patch(':id') //FEAT: Change this later to take id from request.user
    async updateUser(
        @Param(':id') id: string,
        @Body() data: UpdateUserDto,
    ): Promise<UserResponseDto[]> {
        const updatedUser = await this.userService.updateUser(id, data);
        return plainToInstance(UserResponseDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }
}
