export interface Paginated<T> {
    data: T[];
    limit: number;
    page: number;
}