import axios, { AxiosRequestConfig, CancelToken } from 'axios';
import Router from 'next/router';
import { Redirect, StatusRes } from '@/types';
import envs from './envs';

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token: string) {
    localStorage.setItem('token', token);
}

export function revokeToken() {
    localStorage.removeItem('token');
}

function generateRequest({ host }: { host: string }) {
    return <Res = any>(
        method: 'POST' | 'GET' | 'PUT' | 'DELETE',
        url: string,
        data?: any,
        cancelToken?: CancelToken,
        headers?: AxiosRequestConfig['headers'],
    ): Promise<Res> => {
        return new Promise((res, rej) => {
            // eslint-disable-next-line no-console
            console.log(`| ${method} ${host}${url}${data !== undefined && data !== null ? `\n| body : ${JSON.stringify(data)}` : ''}`);

            axios({
                method,
                url: host + url,
                data,
                headers: { Authorization: `Bearer ${getToken()}`, ...headers },
                cancelToken
            })
                .then(({ data }) => res(data))
                .catch(err => {
                    // eslint-disable-next-line no-console
                    console.error({ err });

                    if (err?.response?.data) {
                        rej(err.response.data);
                    }
                });
        });
    };
}

export const request = generateRequest({ host: envs.API_HOST });

export async function fetcher(url: string) {
    return await request('GET', url);
}

const notAutheticatedRoutes = ['/', '/signup', '/login'];

export const checkAuthentication = async () => {
    let redirect: Redirect = 'done';

    if (!getToken()) return { authenticated: false, redirect };

    try {
        const data = await request<StatusRes>('GET', '/authentication/status');
        redirect = notAutheticatedRoutes.includes(Router.pathname) ? '/home' : 'done';

        return { authenticated: true, logout: false, ...data, redirect };
    } catch (err: any) {
        revokeToken();
        redirect = notAutheticatedRoutes.includes(Router.pathname) ? 'done' : '/';

        return { authenticated: false, redirect };
    }
};