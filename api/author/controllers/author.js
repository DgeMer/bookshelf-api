'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities = await strapi.services.author.find({
      'user.id': ctx.state.user.id,
    });

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.author }));
  },
};
