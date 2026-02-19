import fs from 'fs';
import path from 'path';
import { Category } from './types';
import { mockCategories } from './data';

const DB_PATH = path.join(process.cwd(), 'src', 'lib', 'categories.json');

export function getCategories(): Category[] {
    try {
        if (!fs.existsSync(DB_PATH)) {
            // Seed with mock data if file doesn't exist
            fs.writeFileSync(DB_PATH, JSON.stringify(mockCategories, null, 2));
            return mockCategories;
        }
        const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading categories DB:', error);
        return [];
    }
}

export function saveCategory(category: Category): Category {
    const categories = getCategories();
    const newCategories = [...categories, category];
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(newCategories, null, 2));
        return category;
    } catch (error) {
        console.error("Error saving category", error);
        throw new Error("Failed to save category");
    }
}
