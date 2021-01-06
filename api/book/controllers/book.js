'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async count(ctx) {
    let entity = await strapi.services.book
      .count({
        'user.id': ctx.state.user.id,
        isReading: ctx.query.isReading,
        isRead: ctx.query.isRead,
        isNotfinished: ctx.query.isNotfinished,
        isNotActual: ctx.query.isNotActual,
        isPlanned: ctx.query.isPlanned,
      });
    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  async create(ctx) {
    ctx.request.body.user = ctx.state.user.id;
    let entity = await strapi.services.book.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  async find(ctx) {
    let entities = await strapi.services.book.find({
      'user.id': ctx.state.user.id,
      isReading: ctx.query.isReading,
      isRead: ctx.query.isRead,
      isNotfinished: ctx.query.isNotfinished,
      isNotActual: ctx.query.isNotActual,
      isPlanned: ctx.query.isPlanned,
      _limit: ctx.query.limit || 10,
      _start: ctx.query.start || 0,
      _sort: ctx.query._sort || 'title:ASC'
    });

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.book }));
  },
};
