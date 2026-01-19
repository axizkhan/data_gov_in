export class httpClientError extends Error {
  constructor(status = 400, message = "", code = "", validateMessage = "") {
    super(message);
    this.message = message;
    this.status = status;
    this.code = code;
    this.validateMessage = validateMessage;
  }
}

export class BadRequest extends httpClientError {
  constructor(
    message = "Bad Request",
    code = "BAD_REQUEST",
    validateMessage = "BAD_REQUEST"
  ) {
    super(400, message, code, validateMessage);
  }
}

export class NotFound extends httpClientError {
  constructor(
    message = "Data Not Found",
    code = "RESOURCE_NOT_FOUND",
    validateMessage = "RESOURCE_NOT_FOUND"
  ) {
    super(404, message, code, validateMessage);
  }
}

export class Forbidden extends httpClientError {
  constructor(
    message = "Forbidden",
    code = "FORBIDDEN",
    validateMessage = "FORBIDDEN"
  ) {
    super(403, message, code, validateMessage);
  }
}
