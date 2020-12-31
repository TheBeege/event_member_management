'use strict';

import KoaJoiRouter from 'koa-joi-router';
import Service from './service';

const router = KoaJoiRouter();
const Joi = KoaJoiRouter.Joi;

router.prefix('/event');

// List events
router.route({
    path: '/',
    method: 'GET',
    handler: Service.listEvents
});

// Create event
router.route({
    path: '/',
    method: 'POST',
    handler: Service.createEvent,
    validate: {
        type: 'json',
        body: {
            title: Joi.string().length(80).description('The title of the event'),
            seriesId: Joi.number().integer().optional().description('The ID of the series the event belongs to'),
            description: Joi.string().description('A long form description of what will happen at the event'),
            startTimestamp: Joi.number().integer().optional().description('A unix timestamp of when the evnet will being'),
            durationMinutes: Joi.number().integer().optional().description('The length in minutes that the event will run for'),
            imageUrl: Joi.string().optional().description('The URL of the image to use for the event'),
            venueId: Joi.number().integer().optional().description('The ID of the venue the event will take place at'),
            onlineLink: Joi.string().uri().optional().description('A valid URI for participants to follow for joining the event online')
        },
        output: {
            201: {
                body: {
                    // TODO: look into swagger definitions and reusing
                    id: Joi.number().integer().description('The ID of the newly created event'),
                    title: Joi.string().length(80).description('The title of the event'),
                    seriesId: Joi.number().integer().optional().description('The ID of the series the event belongs to'),
                    description: Joi.string().description('A long form description of what will happen at the event'),
                    startTimestamp: Joi.number().integer().optional().description('A unix timestamp of when the evnet will being'),
                    durationMinutes: Joi.number().integer().optional().description('The length in minutes that the event will run for'),
                    imageUrl: Joi.string().optional().description('The URL of the image to use for the event'),
                    venueId: Joi.number().integer().optional().description('The ID of the venue the event will take place at'),
                    onlineLink: Joi.string().uri().optional().description('A valid URI for participants to follow for joining the event online')
                }
            },
            500: {
                body: {
                    message: Joi.string(),
                    reason: Joi.string()
                }
            }
        }
    }
});

export default router;
