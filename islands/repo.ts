

export const setLocally = <T>(key: string, value: T): void => {
    window.localStorage?.setItem(key, JSON.stringify(value));
}

export const getLocally = <T>(key: string): T | null => {
    const item = window.localStorage?.getItem(key);

    if(!item) {
        return null;
    }

    return JSON.parse(item);
}
