import { PrismaClient } from '@prisma/client';

// Crea el cliente para poder interactuar con la base de datos
const prismaClientSingleton: PrismaClient = () => {
	return new PrismaClient();
};

// Guarda el contexto que genera el comando "npx prisma generate" para poder usarlo en multiples archivos
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma: PrismaClient = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

// Comprueba que se mantenga el contexto cuando no se buildea para producción para evitar más instancias
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma; 