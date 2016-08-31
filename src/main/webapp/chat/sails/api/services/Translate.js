var client;

module.exports = {
    initialize: function (msClient) {
        client = msClient;
        client.initialize_token();
    },

    translate: function (params, callback) {
        client.translate(params, callback);
    }
};
