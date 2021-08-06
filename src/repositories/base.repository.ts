interface BaseRepository<T> {
    findById(id: string): Promise<T| null>;
    getAll(): Promise<T | null>;
    create(data: any): Promise<T | null>;
    update(id: string, data: string): Promise<T>;
}

export default BaseRepository;