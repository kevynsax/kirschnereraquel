

export const setLocally = <T>(key: string, value: T): void => {
    if(typeof window === 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
        return
    }

    window!.localStorage.setItem(key, JSON.stringify(value));
}

export const getLocally = <T>(key: string): T | null => {
    if(typeof window === 'undefined') {
        return JSON.parse(localStorage.getItem(key) ?? 'null');
    }

    const item = window!.localStorage.getItem(key);

    if(!item) {
        return null;
    }

    return JSON.parse(item);
}
