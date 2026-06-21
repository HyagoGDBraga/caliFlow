import  {cleanEnv, str, port, bool } from "envalid";
import 'dotenv/config';

export const envalid = cleanEnv(process.env, {
    //PORTA DO SERVER PAI
    PORT: port({default: 5000, desc: "Porta do servidor"}),
    //JWT 
    JWT_SECRET: str({desc: "Chave secreta para firmar tokens JWT"}),
    JWT_REFRESH: str({desc: "Chave refresh secreta"}),
    //CORS
    ALLOWED_DOMAINS: str({desc: "Todos os dominios front"}),
    //api de imagem
    CLOUDNARY_API_KEY: str({desc: "API_key do cloudnary"}),
    //BANCO DE DADOS
    DB_HOST: str({desc: "Host do banco de dados!"}),
    DB_PORT: port({desc: "porta do banco", default: 5432}),
    DB_NAME: str({desc:" Nome do banco"}),
    DB_USER: str({desc: "usuário do banco"}),
    DB_PASSWORD: str({desc: "Senha do banco"}),
    //certificado ssl
    DB_SSL: bool({default: false}),
    REDIS_HOST: str({desc: "Host do redis"}),
    REDIS_PORT: port({desc: "Porta do Redis"}),
    GROQ_API_KEY: str({desc: "Chave api do groq"})
});

export const  allowed_domains = envalid.ALLOWED_DOMAINS.split(", ").map(domain =>domain.trim());