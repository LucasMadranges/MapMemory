interface ValidationError {
  field: string;
  errors: string[];
}

interface BadRequestError {
  statusCode: number;
  message: string;
  validationErrors: ValidationError[];
}
