import { storage } from './firebase';
import { ref, getDownloadURL, getMetadata } from "firebase/storage";
import fetch from 'node-fetch';


export default class Storage {

    folder;

    constructor(reference) {
        this.folder = reference;
    }

    getFileMetadata = async (filename) => {
        const mtd = await getMetadata(ref(storage, `${this.folder}/${filename}`));
        return mtd;
    }

    downloadFileUrl = async (filename) => {
        const url = await getDownloadURL(ref(storage, `${this.folder}/${filename}`));
        return url;
    }

    uploadFile = async (uri, name, metadata) => {
        
        let body = new FormData();
        body.append('photo', { uri: uri, name: name, filename: name, type: metadata.contentType });
        body.append('Content-Type', metadata.contentType);

        const url = `https://firebasestorage.googleapis.com/v0/b/devmovem-final.appspot.com/o?uploadType=media&name=${this.folder}%2F${name}`;
        const resp = await fetch(url, {
            method: 'POST', headers: {
                "Content-Type": "multipart/form-data",
            }, 
            body: body,
        });

    }

}