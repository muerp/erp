import { StorageKey } from "../../utils";
import Storage from "../../utils/storage"

export const getToken = () => {
    return Storage.getItem(StorageKey.auth);
}