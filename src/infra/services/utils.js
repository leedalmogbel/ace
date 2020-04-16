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
  };

  const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      
      let dataA = (isNaN(parseInt(a[key]))) ? a[key] : parseInt(a[key]);
      let dataB = (isNaN(parseInt(b[key]))) ? b[key] : parseInt(b[key]);

      const varA = (typeof dataA === 'string')
        ? dataA.toUpperCase() : dataA;
      const varB = (typeof dataB === 'string')
        ? dataB.toUpperCase() : dataB;
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  };

  return {
    resSuccess,
    resError,
    formatTime,
    reformat,
    compareValues
  };
};

module.exports = Utils;