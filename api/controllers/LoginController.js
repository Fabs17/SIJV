/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    postLogin: async(req,res)=>{
        const persona = await Persona.getDatastore().sendNativeQuery(
            "SELECT"
        )
    }

};

