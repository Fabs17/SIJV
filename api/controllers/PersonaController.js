/**
 * PersonaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

function obtenerCiclo (){
    const date = new Date();
    var ciclo = parseInt(date.getFullYear())
    ciclo = ciclo - 1999
    ciclo = date.getFullYear()+'-'+ciclo.toString()
    var mes = (date.getMonth()+1)
    if(mes<8){
        ciclo = parseInt(date.getFullYear())
        const temp = ciclo - 1
        ciclo = ciclo - 2000
        ciclo = temp.toString()+'-'+ciclo.toString()
    }
    return ciclo
}



module.exports = {
    getAlumnos: async(req,res)=>{
        if (res.datos_persona.tipo==3){
            var campos = await Historial.getDatastore().sendNativeQuery(
                "SELECT * FROM historial WHERE alumno="+"'"+res.datos_persona.matricula+"' ORDER BY trimestre ASC"
            )
            console.log(campos.rows);
            campos=JSON.parse(JSON.stringify(campos.rows))
            return res.view('pages/historial',{
                layout: 'layouts/layout',
                tipo: res.datos_persona.tipo,
                datos: res.datos_persona,
                datos_historial: campos
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
    getMaestros: async(req,res)=>{
        var maestros = await Persona.getDatastore().sendNativeQuery(
            " SELECT * FROM persona p JOIN asignacion a ON p.matricula=a.matricula JOIN grupo g ON a.grupo=g.idGrupo WHERE p.tipo=2"
        )
        maestros = JSON.parse(JSON.stringify(maestros.rows))
        return res.view('pages/maestros',{
            layout: 'layouts/layout',
            tipo: res.datos_persona.tipo,
            maestros_data: maestros
        })
    },
    getDirectivos: async(req,res)=>{
        var directivos = await Persona.getDatastore().sendNativeQuery(
            " SELECT * FROM persona p JOIN contacto c ON p.contacto=c.idContacto JOIN directivos d ON d.matricula=p.matricula WHERE p.tipo=1"
        )
        directivos = JSON.parse(JSON.stringify(directivos.rows))
        console.log(directivos);
        return res.view('pages/directivos',{
            layout: 'layouts/layout',
            tipo: res.datos_persona.tipo,
            directivos_data : directivos
        })
    },
    getNuevo: async(req,res)=>{
        var ultima_matricula = await Persona.getDatastore().sendNativeQuery(
            "SELECT matricula FROM persona ORDER BY matricula DESC LIMIT 1"
        )
        ultima_matricula = Object.values(JSON.parse(JSON.stringify(ultima_matricula.rows[0])))[0];
        var matricula = parseInt(ultima_matricula)
        matricula += 1
        matricula = matricula.toString()
        const date = new Date();
        var ciclo = parseInt(date.getFullYear())
        ciclo = ciclo - 1999
        ciclo = date.getFullYear()+'-'+ciclo.toString()
        var mes = (date.getMonth()+1)
        if(mes<8){
            ciclo = parseInt(date.getFullYear())
            const temp = ciclo - 1
            ciclo = ciclo - 2000
            ciclo = temp.toString()+'-'+ciclo.toString()
        }
        var grupos = await Grupo.getDatastore().sendNativeQuery(
            "SELECT * FROM grupo WHERE ciclo="+"'"+ciclo+"'"
        )
        grupos = JSON.parse(JSON.stringify(grupos.rows))
        return res.view('pages/nueva-persona',{
            layout: 'layouts/public',
            matricula : matricula,
            grupos : grupos,

        })
    },
    nuevo: async(req,res)=>{
        var columnas = "(direccion, correo, telefono)"
        const body = req.body
        var valores = "('"+body["direccion"]+"', '"+body["correo"]+"', '"+body["telefono"]+"' )";
        await Contacto.getDatastore().sendNativeQuery(
            "INSERT INTO contacto "+columnas+" VALUES "+valores
        )
        var contacto = await Contacto.getDatastore().sendNativeQuery(
            "SELECT idContacto FROM contacto ORDER BY idContacto DESC LIMIT 1"
        )
        contacto = Object.values(JSON.parse(JSON.stringify(contacto.rows[0])))[0];
        
        columnas = "(matricula, nombres, apellidos, contrasena, contacto, tipo, borrado)"
        valores = "( '"+body["matricula"]+"', '"+body["nombres"]+"', '"+body["apellidos"]+"', '"+body["contrasena"]+"', "+contacto+", "+body["tipo"]+", "+0+")"
        await Persona.getDatastore().sendNativeQuery(
            "INSERT INTO persona "+columnas+" VALUES "+valores
        )
        if(req.body["tipo"]=="1"){
            columnas = "( matricula, puesto , activo)"
            valores = "( '"+body["matricula"]+"', '"+body["cargo"]+"', "+1
            await Directivos.getDatastore().sendNativeQuery(
                "INSERT INTO directivos "+columnas+" VALUES "+valores
            )

        }else{
            
            if(body["grupo"]=="Otro" && body["tipo"]=="3"){
                const curso = obtenerCiclo()
                columnas = "(nombre,ciclo,maestro)"
                valores = "("+body["otro"]+"', '"+curso+"', '' )" 
                await Grupo.getDatastore().sendNativeQuery(
                    "INSERT INTO grupo "+columnas+" VALUES "+valores
                )
                var grupo = await Grupo.getDatastore().sendNativeQuery(
                    "SELECT idGrupo FROM grupo ORDER BY idGrupo DESC LIMIT 1"
                )
                grupo = Object.values(JSON.parse(JSON.stringify(grupo.rows[0])))[0];
                columnas = "(matricula, grupo)"
                valores = "('"+body["matricula"]+"', "+grupo+" )"
                await Asignacion.getDatastore().sendNativeQuery(
                    "INSERT INTO asignacion "+columnas+" VALUES "+valores
                )
                
            }else if(body["grupo"]=="Otro" && body["tipo"]=="2"){
                const curso = obtenerCiclo()
                columnas = "(nombre, ciclo, maestro)"
                valores = "("+body["otro"]+"', '"+curso+"', '"+body["matricula"]+"' )" 
                await Grupo.getDatastore().sendNativeQuery(
                    "INSERT INTO grupo "+columnas+" VALUES "+valores
                )
                var grupo = await Grupo.getDatastore().sendNativeQuery(
                    "SELECT idGrupo FROM grupo ORDER BY idGrupo DESC LIMIT 1"
                )
                grupo = Object.values(JSON.parse(JSON.stringify(grupo.rows[0])))[0];
                columnas = "(matricula, grupo)"
                valores = "('"+body["matricula"]+"', "+grupo+" )"
                await Asignacion.getDatastore().sendNativeQuery(
                    "INSERT INTO asignacion "+columnas+ " VALUES "+valores
                )
                
            }else{
                columnas = "(matricula, grupo)"
                valores = "( '"+body["matricula"]+"', "+body["grupo"]+" )"
                await Asignacion.getDatastore().sendNativeQuery(
                    "INSERT INTO asignacion "+columnas+" VALUES "+valores
                )
                if(body["tipo"]=="2"){
                    await Grupo.getDatastore().sendNativeQuery(
                        "UPDATE grupo SET maestro='"+body["matricula"]+"' WHERE idGrupo="+body["grupo"]
                    )
                }
            }
            
        }
        return res.send({success: 'ok'})
    }
  
};

