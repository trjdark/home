/**
 * desc: 用户类
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/6
 * Time: 下午1:52
 */
import {Storage} from "../utils/storage";

declare interface UserModal {
    userName:string,
    firstName: string,
    fullName: string,
    positionName: string,
    email: string,
    employeeCode: string,
    photo: string,
    sex: number,
    token: string,
}

class User {
    static _key = "_user";
    static _user:UserModal=null;
    /**
     * 获取用户信息
     * @returns {UserModal}
     */
    static get user():UserModal {
        if(!this._user){
            this._user=Storage.get(this._key);
        }
        return this._user;
    }

    /**
     * 设置用户信息
     * @param {UserModal} user
     */
    static set user(user:UserModal){
        this._user = user;
        Storage.set(this._key, user);
    }
    static get enName(){
        return this.user.firstName
    }
    /**
     * 获取用户名
     * @returns {string}
     */
    static get userName(){
        return this.user.userName
    }
    /**
     * 获取用户中文名
     * @returns {string}
     */
    static get chineseName(){
        return this.user.fullName
    }

    /**
     * 岗位
     * @returns {string}
     */
    static get positionName(){
        return this.user.positionName
    }

    /**
     * 头像
     * @returns {string}
     */
    static get photo(){
        return this.user.photo
    }

    /**
     * 性别
     * @returns {number}
     */
    static get sex(){
        return this.user.sex
    }
    /**
     * token
     * @returns {number}
     */
    static get token(){
        return this.user.token
    }

}

export {User}
