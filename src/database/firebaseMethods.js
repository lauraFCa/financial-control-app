import { collection, getDocs, doc, getDoc, updateDoc, serverTimestamp, arrayUnion, setDoc } from 'firebase/firestore';
import db from './firebase';


/**
 *  A classe Storage e responsavel por gerenciar as operacoes de acesso, atualizacao e manipulacao de dados no 
 *  banco de dados Firebase Firestore. Ela abstrai a logica de interacao com o Firestore, proporcionando metodos 
 *  para realizar operacoes como obter todos os usuarios, criar novos usuarios, obter documentos especificos, 
 *  atualizar documentos, entre outros.
 */
export default class Storage {
    collection = collection(db, 'bankapp');
    allUsersDoc = doc(db, 'bankapp', 'allUsersDoc')
    myDoc;

    /**
     *  Inicializa instancias dos objetos Firestore necessarios para operacoes subsequentes
        Aceita um parametro opcional docName para especificar o nome do documento a ser manipulado
     * @param {string} docName 
     */
    constructor(docName) {
        if (docName) {
            this.myDoc = doc(db, 'bankapp', docName);
        } else {
            console.log("Nao ha documentos definidos!")
        }
    }

    /**
     *  Um metodo generico para acessar o banco de dados, utilizado por outros metodos
        Aceita uma funcao func que representa a operacao a ser realizada
        Retorna os dados se isReturn for verdadeiro, caso contrario, retorna true se a operacao for bem-sucedida
     * @param {function} func 
     * @param {boolean} isReturn 
     * @returns Se a operacao teve sucesso
     */
    accessDatabase = async (func, isReturn = false) => {
        try {
            const docSnapshot = await func();
            if (isReturn) {
                if (docSnapshot.exists()) {
                    const dadosDoDocumento = docSnapshot.data();
                    let jsonD = JSON.stringify(dadosDoDocumento);
                    return JSON.parse(jsonD);
                } else {
                    console.log('Documento nao encontrado!');
                    return 404;
                }
            } else {
                console.log('Operacao efetuada com sucesso!');
                return true;
            }
        } catch (error) {
            console.log('Erro na acao: ', error);
            return false;
        }
    }

    /**
     *  Obtem todos os usuarios do documento especifico (allUsersDoc)
     * @returns Um objeto contendo os dados dos usuarios da base
     */
    async getAllUsers() {
        return await this.accessDatabase(async () => await getDoc(this.allUsersDoc), true);
    }

    /**
     * Adiciona um novo usuario ao array de usuarios no documento especifico (allUsersDoc)
     * @param {object} data 
     * @returns Se a operacao teve sucesso
     */
    async createNewUser(data) {
        const out = await this.accessDatabase(async () => {
            await updateDoc(this.allUsersDoc, {
                users: arrayUnion(data)
            });
        });
        return out;
    }

    /**
     * Cria um novo documento com nome especifico baseado no email do usuario.
     * @param {string} email 
     * @returns Se a operacao teve sucesso
     */
    async createNewUserDoc(email) {
        let newDoc = {
            userData: {
                email: email
            }
        };

        try {
            const novoDocRef = doc(db, 'bankapp', email);
            await setDoc(novoDocRef, { ...newDoc, createdAt: serverTimestamp() });
            console.log('Novo documento criado com nome especifico com sucesso!');
            return true;
        } catch (error) {
            console.log('Erro ao criar novo documento com nome especifico:', error);
            return false;
        }
    }

    /**
     * Obtem todos os documentos na colecao bankapp.
     * @returns Uma lista com os documentos
     */
    async getAllDocs() {
        try {
            const querySnapshot = await getDocs(this.collection);
            const nomesDosDocs = querySnapshot.docs.map((doc) => doc.id);
            return nomesDosDocs;
        } catch (error) {
            console.error('Erro ao obter nomes dos documentos:', error);
            return [];
        }
    }

    /**
     * Obtem todos os dados do documento especifico (myDoc)
     * @returns Os dados do documento
     */
    async getFullDoc() {
        return await this.accessDatabase(async () => await getDoc(this.myDoc), true);
    }

    /**
     * Atualiza o documento especifico (myDoc)
     * @param {object} data 
     * @returns Se a operacao teve sucesso
     */
    async updateDoc(data) {
        const out = await this.accessDatabase(async () => {
            await updateDoc(this.myDoc, { ...data, updatedAt: serverTimestamp() });
        });
        return out;
    }

    /**
     * Adiciona um investimento ao valor ja existente no banco
     * @param {object} data 
     * @returns Se a operacao teve sucesso
     */
    async appendToInvestments(data) {
        const out = await this.accessDatabase(async () => {
            await updateDoc(this.myDoc, {
                investments: arrayUnion(data)
            });
        });
        return out;
    }

    /**
     * Adiciona uma receita ao valor ja existente no banco
     * @param {object} data 
     * @returns Se a operacao teve sucesso
     */
    async appendToIncomes(data) {
        const out = await this.accessDatabase(async () => {
            await updateDoc(this.myDoc, {
                incomes: arrayUnion(data)
            });
        });
        return out;
    }

    /**
     * Adiciona um gasto/uma compra ao valor ja existente no banco
     * @param {object} data 
     * @returns Se a operacao teve sucesso
     */
    async appendToExpenses(data) {
        const out = await this.accessDatabase(async () => {
            await updateDoc(this.myDoc, {
                expenses: arrayUnion(data)
            });
        });
        return out;
    }

    /**
     * Deleta um documento especifico da colecao
     * @param {number} index
     * @returns Se a operacao teve sucesso
     */
    async deleteContent(index) {
        try {
            this.collection.doc(index).delete();
            return 'Dados deletados com sucesso!';
        } catch (e) {
            return 'Ocorreu um problema ao deletar os dados da nuvem!\n' + e;
        }
    }
}
