/**
 * PersonaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    getAlumnos: async(req,res)=>{
        if (res.datos_persona.tipo==3){
            return res.view('pages/historial',{
                layout: 'layouts/layout',
                tipo: res.datos_persona.tipo,
                datos: res.datos_persona
            })
        }
        if(res.datos_persona.tipo==2){
            const query = "SELECT * FROM persona p JOIN asignacion a ON p.matricula=a.matricula JOIN grupo g ON a.grupo=g.idGrupo WHERE a.grupo="+res.datos_persona.grupo+" AND p.tipo=3";
            var alumnos = await Persona.getDatastore().sendNativeQuery(query)
            alumnos = JSON.parse(JSON.stringify(alumnos.rows))
            console.log(alumnos)
            return res.view('pages/alumnos',{
                layout: 'layouts/layout',
                tipo: res.datos_persona.tipo,
                alumnos_data: alumnos
            })
        }
        var alumnos = await Persona.getDatastore().sendNativeQuery(
            "SELECT * FROM persona p JOIN asignacion a ON p.matricula=a.matricula JOIN grupo g ON a.grupo=g.idGrupo WHERE p.tipo=3"
        )
        alumnos = JSON.parse(JSON.stringify(alumnos.rows))
        return res.view('pages/alumnos',{
            layout: 'layouts/layout',
            tipo: res.datos_persona.tipo,
            alumnos_data: alumnos
        })
    },
  
};

