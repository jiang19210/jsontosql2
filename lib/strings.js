exports.reEndComma = function (str, separator) {
    return (str.substring(str.length - separator.length) == separator) ? str.substring(0, str.length - separator.length) : str;
};
