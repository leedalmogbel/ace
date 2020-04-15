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

  const reformat = (data, character)  => {
    if(typeof data === 'object'){
      Object.keys(data).forEach(function(key) {
        let entry = String(data[key]);
        data[key] = entry.replace(/ /g, character).trim().toLowerCase();
      });
      return data;
    }
    return 'Data must be an object';
  }

  return {
    resSuccess,
    resError,
    formatTime,
    reformat
  };
};

module.exports = Utils;