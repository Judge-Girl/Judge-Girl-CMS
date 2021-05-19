import axios from "axios";

export default class AbstractService {
    constructor({baseURL, timeout, tokenSupplier}) {
        this.axios = axios.create({
            baseURL, timeout
        });

        this.axios.interceptors.request.use(request => {
            if (tokenSupplier) {
                const token = tokenSupplier();
                if (token) {
                    request.headers['Authorization'] = `Bearer ${token}`;
                }
            }
            return request;
        });
    }
}
