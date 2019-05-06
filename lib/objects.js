exports.isEmpty = function (obj) {
    if (obj == null) {
        return true;
    }
    for (var key in obj) {
        return false;
    }
    return true;
};