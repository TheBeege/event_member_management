'use strict';

import 'reflect-metadata';
import {ContextWithLoggerDb} from "../types";
import EventModel from "./model";

export default class EventService {
    static async listEvents(ctx: ContextWithLoggerDb) {
        let modelList: EventModel[];
        try {
            modelList = await EventModel.find(ctx.dbTransactionManager);
        } catch (e) {
            ctx.log.error('Failed to get list of event models');
            throw e;
        }

        return ctx.body = {
            events: modelList
        };
    }

    static async createEvent(ctx: ContextWithLoggerDb) {
        const eventRepository = ctx.dbTransactionManager.getRepository(EventModel);

        let eventModel;
        try {
            eventModel = await eventRepository.create(ctx.body);
        } catch (e) {
            // TODO: setup error system
            ctx.status = 500;
            ctx.body = {
                message: 'InternalServerError',
                reason: 'Encountered error attempting to save event'
            }
        }

        ctx.status = 201;
        ctx.body = eventModel;
    }
}
