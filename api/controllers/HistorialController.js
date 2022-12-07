/**
 * HistorialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    getPonderacion: async(req,res)=>{

        var persona = await Persona.getDatastore().sendNativeQuery(
            "SELECT * FROM persona p JOIN asignacion a ON p.matricula=a.matricula JOIN grupo g ON a.grupo=g.idGrupo WHERE p.matricula="+req.params["id"]
        )
        persona = JSON.parse(JSON.stringify(persona.rows[0]))
        var ponderacion = await Historial.getDatastore().sendNativeQuery(
            "SELECT * FROM historial WHERE alumno="+req.params["id"]+" AND grupo="+persona.idGrupo+" AND trimestre="+req.params["trimestre"]
        )
        if(ponderacion.rows.length===0){
            ponderacion = {};
        }else{
            ponderacion = JSON.parse(JSON.stringify(ponderacion.rows[0]))
        }
        console.log(ponderacion);
        return res.view('pages/formulario-ponderacion',{
            layout: 'layouts/layout',
            tipo: res.datos_persona.tipo,
            data_persona: persona,
            data_ponderacion: ponderacion,
            trimestre : req.params["trimestre"]

        })
    },
    postPonderacion: async(req,res)=>{
        const idHistorial = req.body.Historial
        const alumno = req.params["id"]
        const grupo = req.body.Grupo
        const trimestre = req.params["trimestre"]
        const LC = req.body.LC
        const PM = req.body.PM
        const ECMNS = req.body.ECMNS
        const EF = req.body.EF
        const A = req.body.A
        const ES = req.body.ES
        if(req.body.Historial===''||req.body.Historial===null){
            var query = "INSERT INTO historial (alumno, grupo, trimestre, LC, PM, ECMNS, EF, A, ES) VALUES ("+"'"+alumno+"'"+","
            query = query +grupo+","+trimestre+","+ "'"+LC+"'"+","+ "'"+PM+"'"+","+ "'"+ECMNS+"'"+","+ "'"+EF+"'"+","+ "'"+A+"'"+","+ "'"+ES+"'"+")"
            await Historial.getDatastore().sendNativeQuery(query)
            return res.redirect("/alumnos")
        }
        var query = "UPDATE historial SET LC="+"'"+LC+"'"+", PM="+ "'"+PM+"'"+", ECMNS="+ "'"+ECMNS+"'"+", EF="+ "'"+EF+"'"+", A="+ "'"+A+"'"+", ES="+"'"+ES+"'"
        query = query + " WHERE idHistorial="+idHistorial
        await Historial.getDatastore().sendNativeQuery(query)
        return res.redirect("/alumnos")

    }

};

