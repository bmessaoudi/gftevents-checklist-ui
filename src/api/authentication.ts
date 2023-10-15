import { AuthRes, LoginData, RegisterData, StatusRes } from "@/types";
import { request, revokeToken } from "@/utils";
import { useGlobalContext } from "@/utils/context";
import { useEffect } from "react";
import useSWR from "swr";

export const emailSignup = async (data: RegisterData) => {
    return await request<AuthRes>('POST', '/authentication/signup', data);
};

export const login = async (data: LoginData) => {
    return await request<AuthRes>('POST', '/authentication/login', data);
};


export const logout = async () => {
    const response = await request<StatusRes>('POST', '/authentication/logout');
    revokeToken();

    return response;
};

// TODO implement get status in the backend
export const status = async () => {
    return await request<StatusRes>('GET', '/authentication/status');
};

export const useGetStatus = () => {
    const { authenticated, updateGlobalContext } = useGlobalContext();
    const { data, ...others } = useSWR<StatusRes>(authenticated ? '/authentication/status' : null, { refreshInterval: 10000 });

    useEffect(() => {
        if (!data) return;

        updateGlobalContext(data);
    }, [data]);

    return { status: data, ...others };
};
