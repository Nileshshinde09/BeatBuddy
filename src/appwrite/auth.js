import { Client, ID, Storage, Account } from "appwrite";
import conf from '../conf/conf'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.bucket = new Storage(this.client);

    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, email)
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    async login({ email, password }) {
        try {
            
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
           
            throw error;
        }
    }
    
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService