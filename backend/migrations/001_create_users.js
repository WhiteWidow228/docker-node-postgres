exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("users", {
        id: {
            type: "serial",
            primaryKey: true
        },

        name: {
            type: "text",
            notNull: true
        }
    });

    pgm.sql(`
        INSERT INTO users (name)
        VALUES ('Kaban');
    `);
};


exports.down = (pgm) => {
    pgm.dropTable("users");
};