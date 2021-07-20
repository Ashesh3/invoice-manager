function sendResponse(res, status_code, is_success, data) {
    if (is_success)
        return res.status(status_code).json({ "success": is_success, "data": data });
    else
        return res.status(status_code).json({ "success": is_success, "error": data });
}

module.exports = {
    sendResponse: sendResponse
};