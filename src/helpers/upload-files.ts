import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const uploadFile = (files: any, folder = '',validEstensions=['jpg','jpeg','png','gif','pdf'])=> {
    return new Promise ((resolve, reject)=>{
        const  { upFile } = files;

        // get extension
        const separateName = upFile.name.split('.')
        const extension = separateName[separateName.length-1];
        const uniqueName = uuidv4() + '.' + extension;

        // const uploadPath = path.join(__dirname, '../../uploads/', upFile.name );
        const uploadPath = path.join(__dirname, '../../uploads/', folder ,uniqueName );

        // validate extensions
        if (!validEstensions.includes(extension)) {
           return reject(`${ extension } is a invalid extension, valid extension: ${validEstensions}`);
        }

        // mv() method to place the file on your server
        upFile.mv(uploadPath, (err)=> {
            if (err) {
                console.log(err);
                return reject(`Error to upload file`);
            }
            resolve(uniqueName);
        });
    });
}
export default uploadFile;