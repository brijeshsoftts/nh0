"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashRandomStr = exports.generateRandomStr = exports.comparePassword = exports.hashPassword = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const argon2 = __importStar(require("argon2"));
const hashPassword = async (str) => {
    return await argon2.hash(str);
};
exports.hashPassword = hashPassword;
const comparePassword = async (raw, hashedStr) => {
    return await argon2.verify(hashedStr, raw);
};
exports.comparePassword = comparePassword;
const generateRandomStr = (length = 64) => {
    return node_crypto_1.default.randomBytes(length).toString('base64url');
};
exports.generateRandomStr = generateRandomStr;
const hashRandomStr = (token) => {
    return node_crypto_1.default.createHash('sha256').update(token).digest('hex');
};
exports.hashRandomStr = hashRandomStr;
//# sourceMappingURL=hash.helper.js.map