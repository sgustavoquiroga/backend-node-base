class HomeService {
    data: string;
    constructor() {
      this.data = 'Hello world!'
    }
    index(): string {
      return this.data
    }
}
export default HomeService;