import { UserService } from '@/modules/user/services/userService';
import { PartyDto, PartyDtoResponseCreate, PartyDtoResponseGetById } from '@/modules/party/dto/party.dto';
export class CaliPartyService {
    private readonly userService: UserService;
    constructor(userService: UserService ){
        this.userService = userService
    }

    async createParty(party: PartyDto): Promise<PartyDtoResponseCreate>{
        
    }

}