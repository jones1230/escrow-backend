import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

const prismaClient = new PrismaClient();

@Injectable()
export class UserService {
    findAll() {
        return prismaClient.user.findMany();
    }

    getUserById(id: string) {
        return prismaClient.user.findFirst({
            where: { id },
        });
    }

    createUser(createUserData: CreateUserDto) {
        return prismaClient.user.create({
            data: createUserData,
        });
    }

    updateUser(id: string, data: UpdateUserDto) {
        return prismaClient.user.updateManyAndReturn({
            data: data,
            where: { id },
        });
    }
}
