commands = new CommandList();

settings = {
    // internal settings
    sort_commands: true
  , show_border: false

    // command settings
  , delicious_u: ""
  , github_u:    "zxc"
  , smugmug_u:   ""
};

function process() {
    var query = searchbox.value.trim();
    var cmd   = query.split(" ", 1)[0];

    if (commands.has(cmd)) process_command(cmd, query);
    else                   go(instant(escape(query)));

    return false;
}

function process_command(cmd, query) {
    var params = query.split(" ");
    params.shift()

    return commands.get(cmd).call(params);
}

function install(cmd_names, cmd_fn, cmd_doc, cmd_syntax) {
    // Ensure cmd_names is an array
    if (typeof cmd_names == "string") cmd_names = [cmd_names];

    var cmd = new Command(cmd_names, cmd_fn, cmd_doc, cmd_syntax);
    commands.push(cmd);
}

