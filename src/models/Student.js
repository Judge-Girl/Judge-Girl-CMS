export default class Student {
    constructor({id, email, token, expiryTime, isAdmin}) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.expiryTime = expiryTime;
        this.isAdmin = isAdmin;
    }
}
