
function Command(names, fn, doc, syntax) {
    if (!(this instanceof Command)) return new Command(names, fn, doc, syntax);

    this.name    = names[0];
    this.aliases = names;
    this.fn      = fn;
    this.doc     = doc;
    this.syntax  = syntax;

    this.shortcut = (syntax == null ? true : false);

    this.call = function(params) {
        return this.fn(params);
    }
}

function CommandList() {
    if (!(this instanceof CommandList)) return new CommandList();

    this.settings = {
        keep_sorted: 1
    };

    this.storage   = [];
    this.alias_map = {};
    this.length    = 0;

    this.has = function(name) {
        return (name in this.alias_map);
    }

    this.get = function(name) {
        if (typeof name == "string") return this.alias_map[name];
        if (typeof name == "number") return this.storage[name];
        
        error("get called with '" + typeof name + "', needs 'string' or 'number'");
    }

    this.push = function(cmd) {
        cmd.aliases.each(function(alias) {
            if (this.commands.has(alias)) {
                error("install: alias '" + alias + "' already exists");
            } else {
                this.commands.alias_map[alias] = cmd;
            }
        });
        this.storage.push(cmd);
        this.length++;
        if (this.settings.keep_sorted) {
            this.storage.sort(function(a, b) {
                return a.name > b.name;
            });
        }
    }

    // Helper functions for printing a list of commands
    this.get_longest = function() {
        var ret = 0;
        this.storage.each(function(v) {
            if (v.name.length > ret) ret = v.name.length;
        });
        return ret;
    }
}

