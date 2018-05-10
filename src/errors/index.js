export class PermissionDeniedError extends Error {
  constructor(type) {
    super();
    this.name = 'PermissionDenied';
    this.message = `Permission for ${type} has been denied.`;
    this.stack = (new Error()).stack;
  }
}
