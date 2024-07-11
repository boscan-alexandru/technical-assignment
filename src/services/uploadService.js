class UploadService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async uploadFile(file) {
    return this.strategy.upload(file);
  }
}

export default UploadService;
