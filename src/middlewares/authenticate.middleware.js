import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next){
    // Obtener el jwt de la cabecera de autorizacion
    const authHeader = req.headers['authtorization'];
    console.log('authHeader', authHeader);
    // Bearer sfasfsafsafdsafsa
    //['Bearer', 'sdadasdada']
    // 0,1
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token', token);

    if(!token ) return res.sendStatus(401);
    
    //Verificamos y decodificamos el token
    const secret = proccess.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log('error', err);
            return res.sendStatus(403); 
        }
        //si el token es valido
        console.log('user', user);

        req.user = user;
        next();
    })
}