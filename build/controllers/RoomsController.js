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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var RoomsController = /** @class */ (function () {
    function RoomsController() {
    }
    RoomsController.prototype.dataUpdate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_room, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_room = request.params.id_room;
                        return [4 /*yield*/, connection_1.default('rooms').where('id_room', id_room).first()];
                    case 1:
                        room = _a.sent();
                        if (!room) {
                            return [2 /*return*/, response.send('Room not exists!')];
                        }
                        ;
                        return [2 /*return*/, response.json(room)];
                }
            });
        });
    };
    RoomsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rooms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('rooms').select('rooms.*').orderBy('name')];
                    case 1:
                        rooms = _a.sent();
                        return [2 /*return*/, response.json(rooms)];
                }
            });
        });
    };
    RoomsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, trx, roomExists, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body.name;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _a.sent();
                        return [4 /*yield*/, trx('rooms').where('name', name).first()];
                    case 2:
                        roomExists = _a.sent();
                        if (!roomExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, trx.rollback()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.send('Room already exists!')];
                    case 4:
                        ;
                        return [4 /*yield*/, trx('rooms').insert(request.body)];
                    case 5:
                        room = _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, response.send("Room with id " + room + " created with success!")];
                }
            });
        });
    };
    RoomsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_room, _a, name, building, trx, idExists, roomExists, room;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id_room = request.params.id_room;
                        _a = request.body, name = _a.name, building = _a.building;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        return [4 /*yield*/, trx('rooms').where('id_room', id_room).first()];
                    case 2:
                        idExists = _b.sent();
                        if (!!idExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, trx.rollback()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, response.send('Room not exists!')];
                    case 4:
                        ;
                        return [4 /*yield*/, trx('rooms')
                                .where('name', name)
                                .whereNot('id_room', id_room)
                                .first()
                                .select('*')];
                    case 5:
                        roomExists = _b.sent();
                        if (!roomExists) return [3 /*break*/, 7];
                        return [4 /*yield*/, trx.rollback()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, response.send('Room already exists!')];
                    case 7:
                        ;
                        return [4 /*yield*/, trx('rooms').where('id_room', id_room).update({
                                name: name,
                                building: building
                            })];
                    case 8:
                        room = _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, response.send("Room with id " + room + " updated with success!")];
                }
            });
        });
    };
    return RoomsController;
}());
exports.default = RoomsController;
