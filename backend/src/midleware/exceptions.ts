export class BusinessError extends Error {
    code: number = 422;

    constructor(message = 'Business exception') {
      super(message);
      this.name = 'BusinessError';
    }
  }
  
  export class NotFoundError extends Error {
    code = 404;
    constructor(message = 'Not found') {
      super(message);
      this.name = 'BusinessError';
    }
  }


  export class AuthError extends Error {
    code = 401;
    constructor(message = 'UnAuthorised') {
      super(message);
      this.name = 'AuthorisationError';
    }
  }
