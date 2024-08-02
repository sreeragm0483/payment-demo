import { HttpStatus } from '@nestjs/common';

export class SuccessResponse<T> {
  constructor(message: string, result?: T, status?: HttpStatus) {
    return {
      success: true,
      message,
      result,
      status: status || HttpStatus.OK,
    };
  }
}
