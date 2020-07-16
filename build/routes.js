"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var RoomsController_1 = __importDefault(require("./controllers/RoomsController"));
var EventsController_1 = __importDefault(require("./controllers/EventsController"));
var routes = express_1.default.Router();
var roomsController = new RoomsController_1.default();
var eventsController = new EventsController_1.default();
routes.get('/rooms', roomsController.index);
routes.post('/rooms', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required().max(50),
        building: celebrate_1.Joi.string().required().max(50)
    })
}, { abortEarly: false }), roomsController.create);
routes.get('/rooms/:id_room', roomsController.dataUpdate);
routes.put('/rooms/:id_room', roomsController.update);
routes.get('/events', eventsController.index);
routes.get('/events_day', eventsController.eventsOfDay);
routes.post('/events', celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required().max(50),
        description: celebrate_1.Joi.string().required().max(200),
        responsible: celebrate_1.Joi.string().required().max(50),
        date_time: celebrate_1.Joi.string().required(),
        rooms: celebrate_1.Joi.array().required()
    })
}, { abortEarly: false }), eventsController.create);
routes.delete('/events/:id_event', eventsController.remove);
routes.get('/events/:id_event', eventsController.dataRemove);
exports.default = routes;
