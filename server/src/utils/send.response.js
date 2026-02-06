function sendResponse(res, status, options = {}) {
  const { message, data = null, meta = null, errorCode = null } = options;

  const defaultMessage =
    message ??
    (status >= 200 && status < 300
      ? "SUCCESS"
      : status >= 400 && status < 500
      ? "REQUEST_FAILED"
      : "INTERNAL_SERVER_ERROR");

  const responseBody = {
    success: status < 400,
    message: defaultMessage,
  };

  if (data !== null) responseBody.data = data;
  if (meta !== null) responseBody.meta = meta;
  if (errorCode !== null) responseBody.errorCode = errorCode;

  return res.status(status).json(responseBody);
}

export default sendResponse;