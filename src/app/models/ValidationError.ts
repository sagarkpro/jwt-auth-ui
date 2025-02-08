export class ValidationError{
  key: string = '';
  error: string = '';

  constructor(key?: string, error?: string) {
    this.key = key || "";
    this.error = error || "";    
  }
}