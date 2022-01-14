"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
var UserDatabase_1 = require("../data/UserDatabase");
var IdGenerator_1 = require("../services/IdGenerator");
var HashManager_1 = require("../services/HashManager");
var Authenticator_1 = require("../services/Authenticator");
var UserBusiness = /** @class */ (function () {
    function UserBusiness() {
    }
    UserBusiness.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userDataBase, idGenerator, id, hashManager, hashPassword, authenticator, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user.name || !user.email || !user.password || !user.role) {
                            throw new Error("Preencha os campos 'name', 'email', 'password' e 'role'");
                        }
                        if (!user.email.includes("@") || !user.email.includes(".com")) {
                            throw new Error('Formato de e-mail inválido. O e-mail deve conter "@" e ".com" ');
                        }
                        if (!user.password || user.password.length < 6) {
                            throw new Error("Senha inválida por favor a senha deve ter 6 caractres ou mais");
                        }
                        userDataBase = new UserDatabase_1.UserDatabase();
                        idGenerator = new IdGenerator_1.IdGenerator();
                        id = idGenerator.generate();
                        hashManager = new HashManager_1.HashManager();
                        return [4 /*yield*/, hashManager.hash(user.password)];
                    case 1:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, userDataBase.createUser(id, user.name, user.email, hashPassword, user.role)];
                    case 2:
                        _a.sent();
                        authenticator = new Authenticator_1.Authenticator();
                        accessToken = authenticator.generateToken({ id: id, role: user.role });
                        return [2 /*return*/, accessToken];
                }
            });
        });
    };
    UserBusiness.prototype.getUserByEmail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userDataBase, userFromDB, hashManager, hashCompare, authenticator, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user.email || !user.password) {
                            throw new Error(" 'email' e 'password' são obrigatórios");
                        }
                        userDataBase = new UserDatabase_1.UserDatabase();
                        return [4 /*yield*/, userDataBase.getUserByUser(user.email)];
                    case 1:
                        userFromDB = _a.sent();
                        hashManager = new HashManager_1.HashManager();
                        return [4 /*yield*/, hashManager.compare(user.password, userFromDB.getPassword())];
                    case 2:
                        hashCompare = _a.sent();
                        if (!hashCompare) {
                            throw new Error("Invalid Password!");
                        }
                        authenticator = new Authenticator_1.Authenticator();
                        accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
                        return [2 /*return*/, accessToken];
                }
            });
        });
    };
    return UserBusiness;
}());
exports.UserBusiness = UserBusiness;
