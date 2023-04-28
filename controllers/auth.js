const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body; 
    
    try {
        let usuario = await Usuario.findOne({ email });
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
};

const loginUsuarios = async(req, res = response) => {
    const { email, password } = req.body; 

    try {
        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Correo no existe'
            });
        }

        // Confirmar las password
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        
        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
    
}

const revalidarToken = async(req, res = response) => {
    const { uid, name } = req;

    // Generar nuevo token
    const token = await generarJWT(uid, name);



    res.json({
        ok: true,
        msg: 'renew',
        token,
    })
}


module.exports = {
    crearUsuario,
    loginUsuarios,
    revalidarToken,
}