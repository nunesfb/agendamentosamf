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
var date_fns_1 = require("date-fns");
var EventsController = /** @class */ (function () {
    function EventsController() {
    }
    EventsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var events, serializedItens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.default('rooms_events')
                            .innerJoin('events', 'events.id_event', '=', 'rooms_events.id_event')
                            .innerJoin('rooms', 'rooms.id_room', '=', 'rooms_events.id_room')
                            .select([
                            connection_1.default.raw("group_concat(rooms.name) as room_name"),
                            connection_1.default.raw("group_concat(rooms.building) as building"),
                            'events.*'
                        ])
                            .groupBy('rooms_events.id_event')
                            .orderBy('date_time')];
                    case 1:
                        events = _a.sent();
                        serializedItens = events.map(function (event) {
                            var buildingsArray = event.building.split(',');
                            var roomNameArray = event.room_name.split(',');
                            var buildingsRooms = [];
                            for (var i = 0; i < buildingsArray.length; i++) {
                                buildingsRooms.push({ building: buildingsArray[i], room: roomNameArray[i] });
                            }
                            return {
                                id_event: event.id_event,
                                name_event: event.name,
                                location: buildingsRooms,
                                description: event.description,
                                date_time: date_fns_1.format(event.date_time, "'Data: 'dd'/'MM'/'yyyy 'Horário:' HH':'mm"),
                                responsible: event.responsible
                            };
                        });
                        response.json(serializedItens);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsController.prototype.eventsOfDay = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, day, searchDate, events, serializedItens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.query.day, day = _a === void 0 ? Date.now() : _a;
                        searchDate = date_fns_1.parseISO(day.toLocaleString());
                        return [4 /*yield*/, connection_1.default('rooms_events')
                                .innerJoin('events', 'events.id_event', '=', 'rooms_events.id_event')
                                .innerJoin('rooms', 'rooms.id_room', '=', 'rooms_events.id_room')
                                .select([
                                connection_1.default.raw("group_concat(rooms.name) as room_name"),
                                connection_1.default.raw("group_concat(rooms.building) as building"),
                                'events.*'
                            ])
                                .groupBy('rooms_events.id_event')
                                .orderBy('date_time')
                                .whereBetween('date_time', [date_fns_1.startOfDay(searchDate), date_fns_1.endOfDay(searchDate)])];
                    case 1:
                        events = _b.sent();
                        serializedItens = events.map(function (event) {
                            var buildingsArray = event.building.split(',');
                            var roomNameArray = event.room_name.split(',');
                            var buildingsRooms = [];
                            for (var i = 0; i < buildingsArray.length; i++) {
                                buildingsRooms.push({ building: buildingsArray[i], room: roomNameArray[i] });
                            }
                            return {
                                id_event: event.id_event,
                                name_event: event.name,
                                location: buildingsRooms,
                                description: event.description,
                                date_time: date_fns_1.format(event.date_time, "dd'/'MM'/'yyyy HH':'mm"),
                                responsible: event.responsible
                            };
                        });
                        response.json(serializedItens);
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, date_time, responsible, rooms, trx, parsedDateTime, eventDateTime, i, findEventInSameDate, event, eventCreated, id_event, rooms_events;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description, date_time = _a.date_time, responsible = _a.responsible, rooms = _a.rooms;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        parsedDateTime = (date_fns_1.parseISO(date_time));
                        if (!date_fns_1.isPast(parsedDateTime)) return [3 /*break*/, 3];
                        return [4 /*yield*/, trx.rollback()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.send('This date is before the actual date and hour!')];
                    case 3:
                        eventDateTime = date_fns_1.startOfHour(parsedDateTime);
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < rooms.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, trx('rooms_events')
                                .join('events', 'events.id_event', '=', 'rooms_events.id_event')
                                .join('rooms', 'rooms.id_room', '=', 'rooms_events.id_room')
                                .where('date_time', eventDateTime)
                                .where('rooms_events.id_room', rooms[i])
                                .select('*')
                                .first()];
                    case 5:
                        findEventInSameDate = _b.sent();
                        if (!findEventInSameDate) return [3 /*break*/, 7];
                        return [4 /*yield*/, trx.rollback()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, response.send('There is an event already booked in the same local for this date and time!')];
                    case 7:
                        i++;
                        return [3 /*break*/, 4];
                    case 8:
                        event = {
                            name: name,
                            description: description,
                            date_time: eventDateTime,
                            responsible: responsible
                        };
                        return [4 /*yield*/, trx('events').insert(event)];
                    case 9:
                        eventCreated = _b.sent();
                        id_event = eventCreated[0];
                        rooms_events = rooms
                            .map(function (id_room) {
                            return {
                                id_room: id_room,
                                id_event: id_event
                            };
                        });
                        return [4 /*yield*/, trx('rooms_events').insert(rooms_events)];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 11:
                        _b.sent();
                        return [2 /*return*/, response.send('Event inserted with success!')];
                }
            });
        });
    };
    EventsController.prototype.remove = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_event, trx, verify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_event = request.params.id_event;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _a.sent();
                        return [4 /*yield*/, trx('events').where('id_event', id_event).del()];
                    case 2:
                        verify = _a.sent();
                        if (!(verify === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, trx.rollback()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.send('Event not exists!')];
                    case 4: return [4 /*yield*/, trx('rooms_events').where('id_event', id_event).del()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, response.send('Event deleted with success!')];
                }
            });
        });
    };
    EventsController.prototype.dataRemove = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id_event, event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id_event = request.params.id_event;
                        return [4 /*yield*/, connection_1.default('events').where('id_event', id_event).first()];
                    case 1:
                        event = _a.sent();
                        if (!event) {
                            return [2 /*return*/, response.send('Event not exists!')];
                        }
                        ;
                        return [2 /*return*/, response.json({
                                id_event: event.id_event,
                                name: event.name,
                                description: event.description,
                                date_time: date_fns_1.format(event.date_time, "dd'/'MM'/'yyyy HH':'mm"),
                                responsible: event.responsible
                            })];
                }
            });
        });
    };
    return EventsController;
}());
exports.default = EventsController;
