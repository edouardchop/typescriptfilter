import { User, filteredObjects, getDataFromRAM, getDataFromJSON } from './filter';

describe("Filters with criteria", () => {
    const usersInRAM: User[] = [
        { id: 1, name: "John Doe", age: 25 },
        { id: 2, name: "Jane Smith", age: 30 },
        { id: 3, name: "John Smith", age: 25 },
        { id: 4, name: "Alice Brown", age: 22 },
    ];

    test("Load JSON file correctly", async () => {
        const filePath = './users.json';
        const usersFromJSON = await getDataFromJSON<User>(filePath);

        console.log("Loaded users from JSON:", usersFromJSON);

        expect(usersFromJSON).toEqual([
            { id: 1, name: "John Doe", age: 25 },
            { id: 2, name: "Jane Smith", age: 30 },
            { id: 3, name: "John Smith", age: 25 },
            { id: 4, name: "Alice Brown", age: 22 },
        ]);
    });

    test("Filter data from RAM by name", () => {
        const criteria = { name: "John Doe" };
        const result = filteredObjects(usersInRAM, criteria, 'WHERE "name" = "John Doe"');

        console.log("Filtered by name (John Doe):", result);

        expect(result).toEqual([{ id: 1, name: "John Doe", age: 25 }]);
    });

    test("Filter data from JSON by age", async () => {
        const filePath = './users.json';
        const usersFromJSON = await getDataFromJSON<User>(filePath);

        const criteria = { age: 25 };
        const result = filteredObjects(usersFromJSON, criteria, 'WHERE "age" = 25');

        console.log("Filtered by age (25):", result);

        expect(result).toEqual([
            { id: 1, name: "John Doe", age: 25 },
            { id: 3, name: "John Smith", age: 25 },
        ]);
    });

    test("Filter data with combined criteria", () => {
        const criteria = { name: "John Smith", age: 25 };
        const result = filteredObjects(usersInRAM, criteria, 'WHERE "name" = "John Smith" AND "age" = 25');

        console.log("Filtered by combined criteria (name: John Smith, age: 25):", result);

        expect(result).toEqual([{ id: 3, name: "John Smith", age: 25 }]);
    });
});
