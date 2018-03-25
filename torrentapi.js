/**
 * Created by aaflalo on 14/09/16.
 */

import TorrentApi from 'torrentapi'

module.exports = function (RED) {

    function TorrentApiNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        let search = this.search = config.search;
        this.on('input', function (msg) {
            if (msg.search) {
                search = msg.search;
            }
            const params = {
                search_string: search,
                sort: "seeders",
                ranked: 0
            };
            if (msg.category) {
                params.category = msg.category;
            }
            if (msg.sort) {
                params['sort'] = msg.sort;
            }

            TorrentApi.search(params).then(function (result) {
                msg.payload = result;
                node.send(msg);
            }, function (error) {
                node.error(error);
            });
        });
    }

    RED.nodes.registerType("torrentapi", TorrentApiNode);
};