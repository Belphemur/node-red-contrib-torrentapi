/**
 * Created by aaflalo on 14/09/16.
 */

module.exports = function (RED) {

    function TorrentApiNode(config) {
        import TorrentSearchApi from 'torrent-search-api'

        const torrentSearch = new TorrentSearchApi();
        torrentSearch.enableProvider('Rarbg');
        torrentSearch.enableProvider('KickassTorrents');


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
                msg.payload = torrents;
                node.send(msg);
            }, error => {
                node.error(error);
            });
        });
    }

    RED.nodes.registerType("torrentapi", TorrentApiNode);
};