import { fetcher } from "@/utils";
import { useGlobalContext } from "@/utils/context";
import useSWR from "swr";

export interface UserMyResponse {
    _id: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    tickets: number

}

export function useGetUserMy(enabled = true) {
    const { id, authenticated } = useGlobalContext();

    const enableFetch = enabled && authenticated;
    const { data, error, ...others } = useSWR<UserMyResponse>(enableFetch ? ['/user/my', id] : null, fetcher);

    return { user: data, error: error, ...others };
}