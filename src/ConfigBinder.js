
module.exports = class ConfigBinder {
    constructor(binding, options = {}) {
        this._binding = binding;

        this._autoJoin = (options.autoJoin === undefined) ? " " : options.autoJoin;
    }

    convert(cfg) {
        var res = {};

        Object.getOwnPropertyNames(this._binding).map(property => {
            res[property] = {};

            Object.getOwnPropertyNames(this._binding[property]).forEach(subProperty => {
                let attributes = this._binding[property][subProperty].map((attr) => this._convertAttributes(attr, cfg));
                if(this._autoJoin != null) {
                    attributes = attributes.filter(p => p !== "").join(this._autoJoin);
                }

                res[property][subProperty] = attributes;
            });
        });

        return res;
    }

    _convertAttributes(attr, cfg) {
        if(typeof attr !== "object")
            return attr;

        // Get value of the attribute in the config
        var value = cfg[attr.attr];

        // Get binding object if exists
        var binding = attr.binding;

        if(binding != null) {
            if(binding[value] != null) {
                return binding[value];
            } else if(binding["*"] != null) {
                return binding["*"];
            } else {
                return "";
            }
        } else {
            return value;
        }
    }
}