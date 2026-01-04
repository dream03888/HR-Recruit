import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketSupplyService } from './socket-supply.service';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private socket: SocketSupplyService , private http: HttpClient) { }









async getApplicants(pages:number , limit:number): Promise<IResponseMessage> {
    await this.socket.emit('get_getApplicants',  pages, limit );
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_getApplicants')
      .then((response) => {
        return response;
      });
  }





async InsetInterview(data:any): Promise<IResponseMessage> {
    await this.socket.emit('insert_interview', data);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_insert_interview')
      .then((response) => {
        return response;
      });
  }


async UpdateInterview(id:number , state:number): Promise<IResponseMessage> {
    await this.socket.emit('update_interview',  id, state );
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_update_interview')
      .then((response) => {
        return response;
      });
  }


async GetInerview(): Promise<IResponseMessage> {
    await this.socket.emit('get_data_interview',);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_get_data_interview')
      .then((response) => {
        return response;
      });
  }





async InsetJobApplcants(data: any): Promise<IResponseMessage> {
    await this.socket.emit('req_insert_jobApplcants', data);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_insert_jobsApplicants')
      .then((response) => {
        return response;
      });
  }







}
