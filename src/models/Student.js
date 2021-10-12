export default class Student {
	constructor({id, name, email, token, expiryTime, admin}) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.token = token;
		this.expiryTime = expiryTime;
		this.admin = admin;
	}
}
