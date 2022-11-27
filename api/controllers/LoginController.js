/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require("jwt-simple")
module.exports = {
    get: async(req,res)=>{
        return res.view('pages/login',{
            layout: 'layouts/public'
        })
    },
    getLogout: async(req,res) => {
        res.cookie("token-persona", '',{
            maxAge: 0,
            overwrite: true
        });
        return res.redirect("/");
    },
    postLogin: async(req,res)=>{
        const person = await Persona.getDatastore().sendNativeQuery(
            "SELECT * FROM persona INNER JOIN asignacion ON persona.matricula=asignacion.matricula WHERE persona.matricula='"+req.body.matricula+"' AND persona.contrasena='"+req.body.psw+"' LIMIT 1"
        );
        if(!person.rows) throw "El usuario no fue encontrado";
        const send_persona = JSON.parse(JSON.stringify(person.rows[0]));
        const token = jwt.encode(send_persona.matricula, "josevasconcelos");
        res.cookie("token-persona", token, {
            maxAge: 86400000,
            overwrite: true
        });
        return res.redirect("/");
    }

};

