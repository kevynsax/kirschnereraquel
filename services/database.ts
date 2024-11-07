const kv = await Deno.openKv();

interface Collection<T> {
    get(id: string): Promise<T>;
    set(value: T): Promise<void>;
    list(): Promise<T[]>;
}

export const getCollection = <T extends {id: string}>(collectionName: string): Collection<T> => ({
    get: async (id: string) => {
        const result = await kv.get([collectionName, id]);
        if (!result)
            throw new Error(`Item from ${collectionName} with id ${id} not found`);

        return result.value as T;
    },
    set: async (value: T) => {
        await kv.set([collectionName, value.id], value);
    },
    list: async () => {
        const records = kv.list({ prefix: collectionName });
        const result = [];
        for await (const record of records) {
            result.push(record.value as T);
        }
        return result;
    }
});
