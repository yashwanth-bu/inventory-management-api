import sendResponse from "../utils/send.response.js";

function routerError(req, res) {
    sendResponse(res, 404, 
        {message: `THE_ROUTER_['${req.originalUrl}']_DOESN'T EXISTS`}
    )
}

export default routerError;