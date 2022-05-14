"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFacebookUri = void 0;
const buildFacebookUri = (accessToken, userID) => {
    return `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
};
exports.buildFacebookUri = buildFacebookUri;
//# sourceMappingURL=buildFacebookUri.js.map