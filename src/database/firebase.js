import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


/**
 * O arquivo fornece a configuracao e a instancia do Firebase para serem utilizadas em um aplicativo React Native 
 * A configuracao inclui as credenciais da aplicacao Firebase e a inicializacao do aplicativo e do Firestore
 */


/**
 * Um objeto que contem as credenciais e configuracoes do projeto Firebase
 */
const firebaseConfig = {
    
};

/**
 *  A instancia inicializada do aplicativo Firebase
 */
const app = initializeApp(firebaseConfig);

/**
 * A instancia do Firestore associada ao aplicativo Firebase
 */
const db = getFirestore(app);

export default db;