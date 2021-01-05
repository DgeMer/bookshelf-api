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
    entity = await strapi.services.author.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.author });
  },

  async find(ctx) {
    let entities = await strapi.services.author.find({
      'user.id': ctx.state.user.id,
      _sort: ctx.query._sort || 'lastName:ASC'
    });

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.author }));
  },
};
