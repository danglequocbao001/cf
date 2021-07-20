import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CONFIG } from '../../constants';

@Injectable()
export class HttpService {

    baseUrl: string = CONFIG.api_endpoint + '/' + CONFIG.api_prefix;

    http: HttpClient;
    httpOptions: any = {};
    headers: any = {};

    constructor(
        inject: Injector
    ) {
        this.http = inject.get(HttpClient);

        this.setToken();
    }

    /**
     * HTTP GET METHODS
     * @param path url path
     * @param queryParams Object chuẩn để chuyển đổi thành query string
     * @param httpOptions
     */
    $get(path: string, queryParams?: any, httpOptions?: any): Promise<any> {
        if(httpOptions) {
            this.httpOptions = httpOptions;
        }
        return this.to(
            this.http.get(this.getPathWithQueryParams(path, queryParams), httpOptions || this.httpOptions)
        );
    }

    /**
     * HTTP POST METHODS
     * @param path url path
     * @param params Body
     * @param queryParams Object chuẩn để chuyển đổi thành query string
     */
    $post(path: string, params?: any, queryParams?: any, httpOptions?: any): Promise<any> {
        if(httpOptions) {
            this.httpOptions = httpOptions;
        }
        return this.to(
            this.http.post(this.getPathWithQueryParams(path, queryParams), params, this.httpOptions)
        );
    }
        /**
     * HTTP POST METHODS
     * @param path url path
     * @param params Body
     * @param queryParams Object chuẩn để chuyển đổi thành query string
     */
    $post_payment(path: string, params?: any, queryParams?: any): Promise<any> {
        let _path: string = CONFIG.api_endpoint + path;
        if (queryParams) {
            _path += '?' + new URLSearchParams(queryParams).toString();
        }
        return this.to(
            this.http.post(_path, params, this.httpOptions)
        );
    }

    /**
     * HTTP PUT METHODS
     * @param path url path
     * @param params Body
     * @param queryParams Object chuẩn để chuyển đổi thành query string
     */
    $put(path: string, params?: any, queryParams?: any): Promise<any> {
        return this.to(
            this.http.put(this.getPathWithQueryParams(path, queryParams), params, this.httpOptions)
        );
    }

    /**
     * HTTP PUT METHODS
     * @param path url path
     * @param params Body
     * @param queryParams Object chuẩn để chuyển đổi thành query string
     */
    $patch(path: string, params?: any, queryParams?: any): Promise<any> {
        return this.to(
            this.http.patch(this.getPathWithQueryParams(path, queryParams), params, this.httpOptions)
        );
    }

    /**
     * HTTP DELETE METHODS
     * @param path url path
     * @param queryParams Object chuẩn để chuyển đổi thành query string
     */
    $delete(path: string, queryParams?: any): Promise<any> {
        return this.to(
            this.http.delete(this.getPathWithQueryParams(path, queryParams), this.httpOptions)
        );
    }

    /**
     * Chuyển đổi Observable sang Promise
     * @param obs http Observable
     * @return Promise<any>
     */
    to(obs: Observable<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const subscriber = obs.subscribe(
                complete => resolve(complete),
                errors => reject(errors),
                () => subscriber.unsubscribe()
            );
        });
    }

    /**
     * Add a header
     * @param name Header name
     * @param value Header value
     */
    addHeader(name: string, value: string) {
        this.headers[name] = value;
        this.setHeader();
    }

    /**
     * Set token to http
     * @param token Auth token
     */
    setToken(token?: string) {
        // console.log(token, 'token');
        
        if (!token) {
            token = localStorage.getItem('Authorization');
        }
        if (token) {
            this.addHeader('Authorization',token);
        }
    }

    private setHeader() {
        // console.log('setHeader');
        // console.log(this.headers, 'this.headers');
        
        this.httpOptions['headers'] = new HttpHeaders(this.headers);
    }

    /**
     * Return path with query string
     * @param path current path
     * @param queryParams Query params object
     */
    private getPathWithQueryParams(path: string, queryParams: string): string {
        let _path: string = this.baseUrl + path;
        if (queryParams) {
            _path += '?' + new URLSearchParams(queryParams).toString();
        }

        return _path;
    }

}
