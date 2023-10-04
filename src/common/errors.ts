import { Request, Response } from 'express';

export default {
  badRequest(res: Response, options: any) {
    return res.status(400).json(
      Object.assign(
        {
          code: 400,
          success: false,
          type: 'bad-request',
          message: 'The request could not be understood',
        },
        options,
      ),
    );
  },
  entityTooLarge(res: Response, opts: any) {
    return res.status(413).json(
      Object.assign(
        {
          code: 413,
          success: false,
          type: 'file-too-large',
          message: 'Maximum file limit exceeded',
        },
        opts,
      ),
    );
  },
};
