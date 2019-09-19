const Utils = () => {
  const resSuccess = (data, message, statusCode) => {
    return {
      'Status Code': statusCode,
      data,
      message,
    };
  };

  const resError = (errCode, errContent) => {
    const resContent = {
      message: errContent,
    };
    const response = JSON.stringify(resContent);

    return {
      statusCode: errCode,
      body: response,
    };
  };

  return {
    resSuccess,
    resError
  };
};

module.exports = Utils;