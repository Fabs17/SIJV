const jwt = require("jwt-simple")
module.exports = async function (req, res, proceed){

    const tokenPersona = req.cookies["token-persona"];
    const tokenAdministrador = req.cookies["token-administrador"];

    if (tokenAdministrador) {
        res.cookie('token-administrador', '', {
            maxAge: 0,
            overwrite: true,
        });
    }

    if(!tokenPersona) {
        return res.redirect("/login");
    }
    
    var codigo = jwt.decode(tokenPersona, "josevasconcelos");
    var datos_Persona = await  Persona.getDatastore().sendNativeQuery(
        "SELECT * FROM persona INNER JOIN asignacion ON persona.matricula=asignacion.matricula WHERE persona.matricula='"+codigo+"'"
    );

    if(datos_Persona.rows){
        res.datos_persona = JSON.parse(JSON.stringify(datos_Persona.rows[0]));
        return proceed();
    }

    return res.forbidden();

}