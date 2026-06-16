import { asyncHandler } from './../../../decorators/assyncCatch.decorator';
import { AppError } from "@/decorators/Error.decorator";
import { Request, Response } from "express";
import { Role } from "@/helpers";
import { errorMiddleware } from "@/decorators/global.middleware";
import { UserService } from "../services/userService";
import { FriendShipService } from "../services/friendship.service";
import { CaliPartyService } from "@/modules/party/service/party.service";
//import { UserDtoResponseCreate, GetByIdResponse, UserDtoResponseGet, UserDtoResponsePartial, UserDtoResponsePatch, UserDtoResponseUpdate } from "../dto/UserDto";
export class UserController {
    private readonly userService: UserService;
     private readonly friendShipService: FriendShipService;
      private readonly caliPartyService: CaliPartyService;
      constructor(userService: UserService, friendShipService: FriendShipService, caliPartyService: CaliPartyService){
        this.caliPartyService = caliPartyService;
        this.friendShipService = friendShipService;
        this.userService = userService;
      }

        postUser = (asyncHandler( async(req: Request, res: Response) =>{
            const {
                   name,
                      bio,
                      email,
                      password,
                      photo,
                      friends,
                      notification,
                      role
            } = req.body;
            const user = await this.userService.createUser(req.body)
            res.status(201).json({message: `User criado: ${user}`, user});
      }))

getUser = asyncHandler(async(req: Request, res: Response)=>{
      if(req.user == undefined){
            throw new AppError(`o usuário da requisição é undefined`, 401);
      }
      const role = req.user.role;
       const page = Number(req.query.page) || 1;
       const limit = Number(req.query.limit) || 10;
      const user = await this.userService.getAllUser(role, page, limit);
      res.status(200).json({message: `Todos os usuários: \n`, user})
})

updateUser = asyncHandler(async(req: Request, res: Response) =>{
      if(req.user == undefined){
             throw new AppError(`o usuário da requisição é undefined`, 401);
      }
      const userRole = req.user.role;
    const {
             name,
                      bio,
                      email,
                      password,
                      photo,
                      friends,
                      notification,
                      role
      } = req.body;
     const id = req.params.id;

if (!id || Array.isArray(id) || typeof id !== "string") {
  throw new AppError("id é obrigatório", 400);
}
      const user = await this.userService.updateUser( req.body, id, userRole);
      res.status(201).json({message: `User Atualizado: \n`, user});
})


getUserById = asyncHandler(async(req: Request, res: Response)=>{
      if(req.user == undefined) {
            throw new AppError(`Usuário da requisição é nulo`, 401);
      }
      const id = req.params;
    if (!id || Array.isArray(id) || typeof id !== "string") {
  throw new AppError("id é obrigatório", 400);
}

      const role = req.user?.role;
      if(role == undefined || role == null){
            throw new AppError(`Role é undefined ou null`, 401)
      }
      const user = await this.userService.getUserById(id, role);
      res.status(200).json({message:`Usuário retornado: \n`, user});
})  

patchUser = asyncHandler(async(req: Request, res: Response)=>{
      if(req.user == undefined){
            throw new AppError(`Usuário da requisição é undefined!`, 401);

      }
      const id = req.params;
      if(!id || typeof id !== 'string' || Array.isArray(id)){
           throw new AppError("id é obrigatório", 400);
      }
      
      //const partial = await this.userService.

})
}
