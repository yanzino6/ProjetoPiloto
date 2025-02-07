import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../jwt/jwt';

// verifica se o usuário está autenticado por meio da token e emite stuatus de sucesso ou erro
export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.error("Nenhum token fornecido.");
        res.status(401).json({ error: 'Token required' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded: any = verifyToken(token);
        

        if (!decoded.id) {
            console.error("❌ Erro: O token não contém um ID de usuário.");
            res.status(401).json({ error: "Token inválido" });
            return;
        }

        
        req.user = { id: decoded.id };

        
        next();
    } catch (error) {
        console.error("❌ Erro ao verificar token:", error);
        res.status(401).json({ error: "Unauthorized" });
    }
};