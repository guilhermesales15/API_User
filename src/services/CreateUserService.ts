import prismaClient from "../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    async execute({email, name, password}: UserRequest){

        if(!email){
            throw new Error("Email incorreto")
        }
    
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExists){
            throw new Error("email já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        const usuario = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },

            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return usuario
    }
    
}

export {CreateUserService}