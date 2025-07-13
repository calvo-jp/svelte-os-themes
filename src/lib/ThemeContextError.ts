export class ThemeContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContextError';
  }
}
