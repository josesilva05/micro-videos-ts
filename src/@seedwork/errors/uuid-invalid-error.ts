export default class uuidInvalidError extends Error {
  constructor(message?: string){
    super(message || 'ID must be a valid uuid');
    this.name = 'uuidInvalidError';
  }
}