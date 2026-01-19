import { httpClientError } from "./errorClass.js";

function CommonresponseSender(req, res, next) {
  res.status(200);
  return res.json({
    data: req.responseData,
    message: "Data Found SuccessFully",
    success: true,
  });
}

function ErrorHandling(err, req, res, next) {
  if (err instanceof httpClientError) {
    return res.status(err.status).json({
      data: [],
      message: err.message,
      success: false,
      errors: [
        {
          code: err.code,
          message: err.validateMessage,
        },
      ],
    });
  } else {
    return res.status(500).json({
      data: [],
      message: "Internal server error",
      success: false,
      err: [
        {
          code: 500,
          message: "SOMETHING_WENT_WRONG",
        },
      ],
    });
  }
}
export { ErrorHandling, CommonresponseSender };
