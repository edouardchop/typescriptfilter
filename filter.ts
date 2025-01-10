import fs from 'fs/promises';

export type User = {
    id: number;
    name: string;
    age: number;
};

export const filteredObjects = <T>(items: T[], criteria: Partial<T>): T[] => {
    try {
        const conditions = Object.entries(criteria)
            .map(([key, value]) => `"${key}" = "${value}"`)
            .join(" AND ");
        console.log(`Filter : WHERE ${conditions}`);

        return items.filter((item) =>
            Object.entries(criteria).every(([key, value]) => item[key as keyof T] === value)
        );
    } catch (error) {
        console.error("An error occurred while filtering objects:", error);
        return [];
    }
};

export const getDataFromRAM = <T>(data: T[]): T[] => {
    try {
        return data;
    } catch (error) {
        console.error("An error occurred while accessing data from RAM:", error);
        return [];
    }
};

export const getDataFromJSON = async <T>(filePath: string): Promise<T[]> => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent) as T[];
    } catch (error) {
        console.error(`An error occurred while reading the JSON file at ${filePath}:`, error);
        return [];
    }
};
