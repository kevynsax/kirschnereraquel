

export const setLocally = <T>(key: string, value: T) => {
    if(typeof window === 'undefined') {
        return null;
    }

    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocally = <T>(key: string): T | null => {
    if(typeof window === 'undefined') {
        return null;
    }

    const item = localStorage.getItem(key);

    if(!item) {
        return null;
    }

    return JSON.parse(item);
}
