import {Injectable} from '@angular/core';
import {config} from '../../config/pickthisup.config';
import {Http} from '@angular/http';
import {userModel} from '../models/user.model';

export const BASIC_USER_TYPE_ID = 3;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) {
  }

  login(userModel: userModel) {
    return this.http.post(config.URL + "/auth/login", {
      mail: userModel.email,
      password: userModel.password
    });
  }

  register(data: userModel) {
    return this.http.post(config.URL + "/auth/subscribe", {
      mail: data.email,
      password: data.password,
      name: data.fullName,
      firstname: data.firstName,
      phoneNumber: data.mobile,
      typeId: BASIC_USER_TYPE_ID
    })
  }

  getUserByMail(data: userModel) {
    console.log(data)
    return this.http.get(config.URL + "/auth/forgot-password", {
      params: {
        mail: data.email
      }
    })
  }

}
