/**
 * Created by aaflalo on 14/09/16.
 */

import TorrentApi from 'torrent-search-api'

const torrentApi = new TorrentApi();
torrentApi.enableProvider('Rarbg');
torrentApi.enableProvider('KickassTorrents');

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

            torrentApi.search(search, category).then(torrents => {
                msg.payload = torrents;
                node.send(msg);
            }, error => {
                node.error(error);
            });
        });
    }

    RED.nodes.registerType("torrentapi", TorrentApiNode);
};