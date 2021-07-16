import  jwt  from 'jsonwebtoken';

const jwtGenetaror = ( uid : string = '')=> {
    return new Promise((resolve, reject)=>{
      const payload = { uid };
      // se firma el tocken
      jwt.sign (payload, process.env.SECRETORPRIVATEKEY || '793@cd7ddbbdb6V#6733fd&d3543c0eA075' ,{
          expiresIn: '12h'
      }, (err, token)=>{

        if (err){
            console.log ('Error al obtener token: ',err);
            reject('Error al generar token');
        }else{
            resolve(token);
        }
      });

    })

}

export default jwtGenetaror;