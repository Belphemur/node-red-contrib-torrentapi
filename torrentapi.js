/**
 * Created by aaflalo on 14/09/16.
 */


module.exports = function (RED) {

    var TorrentApi = require('torrentapi');
    var torrentImpl = new TorrentApi('Node-RED');

    function TorrentApiNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var search = this.search = config.search;
        this.on('input', function (msg) {
            if (msg.search) {
                search = msg.search;
            }
            var params = {
                search_string: search,
                sort: "seeders"
            };
            if (msg.category) {
                params.category = msg.category;
            }
            if (msg.sort) {
                params['sort'] = msg.sort;
            }

            torrentImpl.search(params).then(function (result) {
                msg.payload = result;
                node.send(msg);
            }, function (error) {
                node.error(error);
            });
        });
    }

    RED.nodes.registerType("torrentapi", TorrentApiNode);
};