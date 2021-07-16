import { OAuth2Client }  from 'google-auth-library';

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID || '755999828127-7mra8pgs3c40c9ivs2u1tpaf6d8lthjm.apps.googleusercontent.com' );

const   googleVerify = async ( idToken : string ='' ) =>{
  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID || '755999828127-7mra8pgs3c40c9ivs2u1tpaf6d8lthjm.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  // const payload = ticket.getPayload();
  const { name: nombre,
          picture: img,
          email: email
        } = ticket.getPayload();
  return { nombre, img, email };
}
// googleVerify().catch(console.error);

export default googleVerify;
