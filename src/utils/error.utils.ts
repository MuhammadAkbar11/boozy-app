class BaseError extends Error {
  constructor(
    public name: string,
    public statusCode: number,
    message?: string
  ) {
    super(message);
    this.name = name ?? "INTERNAL_SERVER";
    this.statusCode = statusCode ?? 500;
    this.message = message ?? "Something went wrong!";
  }
}

export default BaseError;
