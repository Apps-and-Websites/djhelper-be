exports.up = function(knex) {
  return knex.schema
    .createTable('dj-login', tbl => {
      // ------------------- DJ Table ---------------------
      tbl.increments();
      tbl
        .text('username', 128)
        .unique()
        .notNullable();
      tbl.text('password', 128).notNullable();
      tbl.text('name', 128).notNullable();
      tbl.text('email');
      tbl.text('phone');
      tbl.text('website');
      tbl.text('bio');
      tbl.text('profile_pic_url');
    })
    .createTable('locations', tbl => {
      // ------------------- Locations Table ---------------------
      tbl.increments();
      tbl.text('address_line_1', 128).notNullable();
      tbl.text('address_line_2', 128);
      tbl.text('city', 128).notNullable();
      tbl.text('state', 128).notNullable();
      tbl.text('zip', 128).notNullable();
      tbl.text('name', 128);
      tbl.text('phone', 128);
      tbl.text('website', 128);
      tbl.text('email', 128);
      tbl.text('img_url');
    })
    .createTable('playlists', tbl => {
      // ------------------- Playlist Table ---------------------
      tbl.increments();
    })
    .createTable('request_list', tbl => {
      // ----------------- Request List Table -------------------
      tbl.increments();
    })
    .createTable('events', tbl => {
      // ------------------- Events Table ---------------------
      tbl.increments();
      tbl
        .integer('dj_id') // FK
        .unsigned()
        .references('id')
        .inTable('dj-login')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl
        .integer('playlists_id') // FK
        .unsigned()
        .references('id')
        .inTable('playlists')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl
        .integer('request_id') // FK
        .unsigned()
        .references('id')
        .inTable('request_list')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.text('name', 128).notNullable();
      tbl.date('date').notNullable();
      tbl.time('start_time');
      tbl.time('end_time');
      tbl.text('event_type').notNullable();
      tbl.text('description', 255);
      tbl
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
        .onDelete('RESTRICT') // FIXME
        .onUpdate('CASCADE');
      tbl.text('img_url');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('events')
    .dropTableIfExists('dj-login')
    .dropTableIfExists('playlists')
    .dropTableIfExists('request_list')
    .dropTableIfExists('locations');
};
