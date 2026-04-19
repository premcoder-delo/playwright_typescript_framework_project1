import { APIRequestContext } from "@playwright/test";
import authPath from '../data/api-data/api-path-data.json'
import CommonUtils from "./CommonUtils";

export default class CommonAPIUtils {
    private request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    public async createToken() {
        const commonUtils = new CommonUtils();
        const apiUsername = commonUtils.decryptData(process.env.API_USERNAME!);
        const apiPassword = commonUtils.decryptData(process.env.API_PASSWORD!);
        const createTokenReq = await this.request.post(authPath.auth_path, {
            data: {
                "username": apiUsername,
                "password": apiPassword
            }
        });
        const createTokenResp = await createTokenReq.json();
        return createTokenResp.token;
    }
}