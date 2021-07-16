import { Request, Response } from 'express';
import  { uploadFile }  from '../helpers';

const fileUpload = async ( req: Request, res: Response )=> {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.upFile) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    try {
        // const nameFile = await uploadFile( req.files, undefined,['txt','xml']);
        const nameFile = await uploadFile( req.files);
        res.status(200).json({
          message: `${nameFile}`
        });
    } catch (error){
        res.status(400).json({
           message: 'error trying to upload file',
           errors: error
        });

    }


}

export default fileUpload;