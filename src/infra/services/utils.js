const Utils = () => {
  const resSuccess = (data, message) => {
    return {
      statusCode: 200,
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

  const formatTime = seconds => {
    return new Date(1000 * seconds).toISOString().substr(11, 8);
  };

  return {
    resSuccess,
    resError,
    formatTime
  };
};

module.exports = Utils;