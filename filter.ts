import fs from 'fs/promises';

export type User = {
    id: number;
    name: string;
    age: number;
};

export const filteredObjects = <T>(items: T[], criteria: Partial<T>): T[] => {

    const conditions = Object.entries(criteria)
        .map(([key, value]) => `"${key}" = "${value}"`)
        .join(" AND ");
    console.log(`Filter : WHERE ${conditions}`);
    return items.filter((item) =>
        Object.entries(criteria).every(([key, value]) => item[key as keyof T] === value)
    );
};

export const getDataFromRAM = <T>(data: T[]): T[] => {
    return data;
};

export const getDataFromJSON = async <T>(filePath: string): Promise<T[]> => {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as T[];
};
