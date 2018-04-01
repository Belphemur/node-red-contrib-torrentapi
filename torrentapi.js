/**
 * Created by aaflalo on 14/09/16.
 */
const TorrentSearchApi = require('torrent-api-ts');

const torrentSearch = new TorrentSearchApi('Node-RED');

module.exports = function (RED) {

    function TorrentApiNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        let search = this.search = config.search;
        let category = this.category = config.category;
        this.on('input', function (msg) {
            if (msg.search) {
                search = msg.search;
            }

            if (msg.category) {
                category = msg.category;
            }

            torrentSearch.search(search, category).then(torrents => {
                msg.payload = torrents.torrent_results;
                node.send(msg);
            }, error => {
                node.error(error);
            });
        });
    }

    RED.nodes.registerType("torrentapi", TorrentApiNode);
};