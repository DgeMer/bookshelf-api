'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    ctx.request.body.user = ctx.state.user.id;
    entity = await strapi.services.book.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  async find(ctx) {
    let entities = await strapi.services.book.find({
      'user.id': ctx.state.user.id,
      _limit: ctx.query.limit || 10,
      _start: ctx.query.start || 0,
      _sort: ctx.query._sort || 'title:ASC'
    });

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.book }));
  },
};
