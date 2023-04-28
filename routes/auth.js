/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator')


const { crearUsuario, loginUsuarios, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.post(
    '/new',
    [// middlewares
        check('name', 'El nombre es ogligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'Debe tener más de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/', 
    [// middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'Debe tener más de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuarios);

router.get('/renew', validarJWT ,revalidarToken);

module.exports = router;