// Load modules

var Hoek = require('hoek');


// Cache configuration

exports.apply = function (options) {

    Hoek.assert(options, 'Missing options');

    // engine: 'memory', { engine: 'memory' }, { engine: implementation }

    var settings = {};
    if (typeof options === 'string') {
        settings.engine = options;
    }
    else {
        var isExtension = options.engine === 'extension';

        if (isExtension || options.engine && typeof options.engine === 'object') {
            settings.engine = 'extension';
            settings.extension = isExtension ? options.extension : options.engine;
            settings.partition = options.partition || 'catbox';
            return settings;
        }

        settings = Hoek.clone(options);
    }

    settings.partition = settings.partition || 'catbox';

    Hoek.assert(['redis', 'mongodb', 'memory', 'memcache'].indexOf(settings.engine) !== -1, 'Unknown cache engine type: ' + settings.engine);

    if (settings.engine === 'redis') {
        settings.host = settings.host || '127.0.0.1';
        settings.port = settings.port || 6379;
    }
    else if (settings.engine === 'mongodb') {
        settings.host = settings.host || '127.0.0.1';
        settings.port = settings.port || 27017;
        settings.poolSize = settings.poolSize || 5;
    }
    else if (settings.engine === 'memory') {
        settings.maxByteSize = settings.maxByteSize || 100 * 1024 * 1024;         // Defaults to 100MB
    }
    else if (settings.engine === 'memcache') {
        settings.location = settings.location || '127.0.0.1:11211';
    }

    return settings;
};