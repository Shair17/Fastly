"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultAvatar = void 0;
const getDefaultAvatar = (size) => {
    if (size) {
        return `https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/c_scale,w_${size.toString()}/v1625622757/defaults/avatars/fastly_default_wqjsjw.jpg`;
    }
    return `https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1625622757/defaults/avatars/fastly_default_wqjsjw.jpg`;
};
exports.getDefaultAvatar = getDefaultAvatar;
//# sourceMappingURL=getDefaultAvatar.js.map