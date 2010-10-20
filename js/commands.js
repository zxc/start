
//
// System commands
// 
install(["help"]
        , function(params) {
            if (params[0] == null) {
                set_output(" &nbsp; == help -- list of commands ==");
                add_line(" :: type 'help [ command ]' to see details");

                // Figure out how many spaces to pad with
                var long_cmd_len = commands.get_longest(), 
                    diff         = 0;

                commands.each(function(cmd) {
                    diff = long_cmd_len - cmd.name.length + 1;
                    add_line(cmd.name
                            + "&nbsp;".multiply(diff)
                            + " -- &nbsp; " 
                            + cmd.doc
                            );
                });
            } else {
                if (commands.has(params[0])) {
                    var cmd = commands.get(params[0]);
                    set_output(" &nbsp; == " + cmd.name + " ==");
                    add_line(" = description: " + cmd.doc);
                    add_line(" = names: " + cmd.aliases.join(" | "));
                    if (!cmd.shortcut) add_line(" = syntax: " + cmd.syntax);
                } else {
                    set_output(" &nbsp; !! command not found");
                }
            }
        }
        , "provides information on installed commands"
        , "[ _ | command ]"
        );
install(["clear"]
        , function(p) { set_output(""); }
        , "clears the output screen"
        , ""
        );
install(["test"]
        , function(params) {
            if (params.length == 0) {
            } else if (params.length == 1) {
            } else if (params.length == 2) {
                if (params[0].matchAny("available", "a")) {
                    if (commands.has(params[1])) {
                        set_output(" == '" + params[1] + "' is not available");
                    } else {
                        set_output(" == '" + params[1] + "' is available");
                    }
                }
            } else {
            }
        }
        , "allows testing of internal functions"
        , "[ _ | command ]"
        );
install(["history", "h"]
        , function(params) {}
        , "(TODO) provides a list of previously entered commands"
        , "[ _ | number ]"
        );
install(["todo"]
        , function(p) {
            var todo = [ 
                "see TODOs in code"
              , "commands.js is gigantic - organize?"
            ];
            set_output(" &nbsp; == todo ==");
            if (todo.length == 0) add_line("- nothing to do!");
            else todo.each(function(v) { add_line("- " + v); });
        }
        , "list of things to do for this project"
        , null
        );
install(["url", "u"]
        , function(params) {
            var query = params[0];
            if (query == null) {
                window.location.reload();
            } else if (query.match(/^http:\/\//) == null) {
                go("http://" + query);
            } else {
                go(query);
            }
        }
        , "accesses a specific url"
        , "[ url, http optional ]"
        );

//
// Search commands
//
install(["google", "g"]
        , function(params) {
            go("http://google.com/search?q=" + efuse(params));
        }
        , "performs a normal google search"
        , "[ query ]"
        );
install(["instant", "i"]
        , function(params) {
            go(instant(efuse(params)));
        }
        , "forces an \"i'm feeling lucky\" search"
        , "[ query ]"
        );
install(["map"]
        , function(params) {
            go("http://maps.google.com/maps?q=" + efuse(params));
        }
        , "performs a search of google maps"
        , "[ query ]"
        );
// Example cbssports url for a game on 10/19:
// http://www.cbssports.com/nhl/gametracker/live/NHL_20101019_BOS@WAS
// /[LEAGUE]_[YEAR][MONTH][DAY]_[AWAYTEAM]@[ROADTEAM]
//
// Example espn url for a game on 10/19:
// http://sports.espn.go.com/nhl/boxscore?gameId=301019023
// =..[MONTH][DAY]...
install(["score"]
        , function(params) {}
        , "(TODO) looks up scores and sports news"
        , "[ TODO ]"
        );
install(["wikipedia", "wiki", "w"]
        , function(params) {
            var query = efuse(params);
            if (query.imatchAny("", "random", "rand")) {
                go("http://en.wikipedia.org/wiki/Special:Random");
            } else {
                query += " site:en.wikipedia.org";
                go("http://google.com/search?btnI&q=" + query);
            }
        }
        , "performs a search of wikipedia"
        , "[ _ | rand | random | query ]"
        );
install(["ask"]
        , function askmefi(p) { 
            ifblank(
                p
              , "http://ask.metafilter.com"
              , "http://google.com/search?q=site:ask.metafilter.com " + efuse(p)
            );
        }
        , "searches or accesses ask.metafilter"
        , "[ _ | query ]"
        );
install(["tv"]
        , function(p) {
            ifblank(
                p
              , "http://tv.yahoo.com/listings"
              , instant(efuse(p) + " list of episodes site:en.wikipedia.org")
            );
        }
        , "accesses episode lists and tv schedules"
        , "[ _ | show ]"
        );
install(["music", "gs", "song"]
        , function(p) {
            ifblank(
                p
              , "http://listen.grooveshark.com/"
              , "http://listen.grooveshark.com/#/search/songs/?query=" + efuse(p)
            );
        }
        , "searches for a song on grooveshark"
        , "[ _ | query ]"
        );
install(["amazon", "amz", "a"]
        , function(params) {
            ifblank(params
              , "http://amazon.com"
              , instant("site:amazon.com " + efuse(params))
            );
        }
        , "searches amazon.com"
        , "[ _ | product ]"
        );
install(["hn"]
        , function(p) { 
            ifblank(
                p
              , "http://news.ycombinator.com"
              , instant("site:news.ycombinator.com " + efuse(p))
            );
        }
        , "search or access hacker news"
        , "[ _ | query ]"
        );
install(["bitsoup", "bs", "b"]
        , function(params) { 
            ifblank(params
              , "http://bitsoup.org/browse.php"
              , "http://bitsoup.org/browse.php?search=" + efuse(params)
            );
        }
        , "searches bitsoup (torrents)"
        , "[ _ | query ]"
        );
install(["movie", "film"]
        , function(params) {
            ifblank(params
              , "http://imdb.com"
              , instant("site:en.wikipedia.org film " + efuse(params))
            );
        }
        , "searches for a movie on wikipedia"
        , "[ _ | movie title ]"
        );
install(["imdb"]
        , function(params) {
            ifblank(params
              , "http://imdb.com"
              , instant("site:imdb.com " + efuse(params))
            );
        }
        , "searches imdb"
        , "[ _ | movie title ]"
        );
install(["urbandict", "ud"]
        , function(params) {
            ifblank(params
              , "http://urbandictionary.com"
              , "http://urbandictionary.com/define.php?term=" + efuse(params)
            );
        }
        , "searches urban dictionary"
        , "[ _ | slang word ]"
        );
install(["nhl", "hockey"]
        , function(params) {
            actions = { "scores":    "scoreboard"
                      , "score":     "scoreboard"
                      , "schedule":  "schedule"
                      , "standings": "standings"
            };
            var q = actions[params[0]] || "";
            go("http://espn.go.com/nhl/" + q);
            // TODO: search
        }
        , "find nhl information"
        , "[ _ | scores | schedule | standings ]"
        );
install(["ncaafb", "college"]
        , function(params) {
            actions = { "scores":    "scoreboard"
                      , "score":     "scoreboard"
                      , "schedule":  "schedule"
                      , "standings": "standings"
                      , "rankings":  "rankings"
                      , "bcs": "bcs"
            };
            var q = actions[params[0]] || "";
            go("http://espn.go.com/college-football/" + q);
            // TODO: search
        }
        , "find college football information"
        , "[ _ | scores | schedule | standings | rankings | bcs ]"
        );
install(["nfl", "football"]
        , function(params) {
            actions = { "scores":    "scoreboard"
                      , "score":     "scoreboard"
                      , "schedule":  "schedule"
                      , "standings": "standings"
            };
            var q = actions[params[0]] || "";
            go("http://espn.go.com/nfl/" + q);
            // TODO: search
        }
        , "find nfl information"
        , "[ _ | scores | schedule | standings ]"
        );
install(["nba", "basketball"]
        , function(params) {
            actions = { "scores":    "scoreboard"
                      , "score":     "scoreboard"
                      , "schedule":  "schedule"
                      , "standings": "standings"
            };
            var q = actions[params[0]] || "";
            go("http://espn.go.com/nba/" + q);
            // TODO: search
        }
        , "find nba information"
        , "[ _ | scores | schedule | standings ]"
        );
install(["thesaurus", "synonyms", "syn", "antonyms"]
        , function(params) {
            ifblank(params
              , "http://thesaurus.com"
              , "http://thesaurus.com/browse/" + efuse(params)
            );
        }
        , "search for synonyms or antonyms"
        , "[ _ | query ]"
        );
install(["dictionary", "dict", "define", "def"]
        , function(params) {
            ifblank(params
              , "http://dictionary.reference.com"
              , "http://dictionary.reference.com/browse/" + efuse(params)
            );
        }
        , "defines words"
        , "[ _ | query ]"
        );
install(["delicious", "del", "d"]
        , function(params) { 
            ifblank(params
              , "http://delicious.com/" + settings["delicious_u"]
              , "http://delicious.com/tag/" + params.join("+")
            );
        }
        , "access or search tags on del.icio.us"
        , "[ _ | tag | tags ]"
        );
install(["github", "git"]
        , function(params) {
            var q = params[0];
            if (q == null) {
                go("http://github.com/" + settings["github_u"]);
            } else if (q.matchAny("rand", "random")) {
                go("http://github.com/repositories/random");
            } else if (q.matchAny("repo", "repos", "repositories")) {
                go("http://github.com/repositories");
            } else if (q.matchAny("ruby", "javascript", "perl", "python",
                       "c", "php", "shell", "java", "c++", "viml")) {
                go("http://github.com/languages/" + q);
            } else {
                go("http://github.com/search?q=" + efuse(params))
            }
        }
        , "access or search github"
        , "[ _ | random | repos | LANGUAGE | query ]"
        );
install(["pirate", "tpb"]
        , function(params) {
            if (params[0] == "") go("http://thepiratebay.org");
            else {
                // CATEGORY in the query can be any key in this dict
                var categories = {
                    audio: 100,  video: 200, apps: 300,  games: 400, other: 600,
                    movies: 201, movie: 201, music: 101, tv: 205,    all: 0
                };
                // 'all' is the default
                var category = categories["all"];
                if (params[0] in categories) category = categories[params.shift()];
                var sort = 7;       // 7 = sort by seeders, decreasing
                go("http://thepiratebay.org/search/" + efuse(params) +
                   "/0/" + sort + "/" + category);
            }
        }
        , "searches the pirate bay"
        , "[ _ | query | CATEGORY query ]"
        );

//
// Programs - originally intended to load content into output box
//
install(["translate"]
        // Looks for syntax: "x into english" || "x from spanish" || etc
        , function(params) {
            // Defaults, Prep, Etc.
            var sl = "auto", tl = "en", q  = "";
            
            var languages = {
              afrikaans:  "af",    albanian:    "sq", arabic:     "ar", 
              armenian:   "hy",    azerbaijani: "az", basque:     "eu", 
              belarusian: "be",    bulgarian:   "bg", catalan:    "ca", 
              chinese:    "zh-CN", croatian:    "hr", czech:      "cs",
              danish:     "da",    dutch:       "nl", english:    "en", 
              estonian:   "et",    filipino:    "tl", finnish:    "fi", 
              french:     "fr",    galician:    "gl", georgian:   "ka", 
              german:     "de",    greek:       "el", haitian:    "ht",
              hebrew:     "iw",    hindi:       "hi", hungarian:  "hu", 
              icelandic:  "is",    indonesian:  "id", irish:      "ga", 
              italian:    "it",    japanese:    "ja", korean:     "ko", 
              latin:      "la",    latvian:     "lv", lithuanian: "lt",
              macedonian: "mk",    malay:       "ms", maltese:    "mt", 
              norwegian:  "no",    persian:     "fa", polish:     "pl",
              portuguese: "pt",    romanian:    "ro", russian:    "ru",
              serbian:    "sr",    slovak:      "sk", slovenian:  "sl",
              spanish:    "es",    swahili:     "sw", swedish:    "sv",
              thai:       "th",    turkish:     "tr", ukrainian:  "uk",
              urdu:       "ur",    vietnamese:  "vi", welsh:      "cy",
              yiddish:    "yi"
            };

            // Handles syntax (must be at the end of the query)
            function handle_direction() {
                if (params.get(-2).imatchAny("to", "into", "from")) {
                    lang = params.pop().toLowerCase();
                    direction = params.pop().toLowerCase();
                    if (direction == "from")         sl = languages[lang];
                    if (direction.matchAny("to", "into")) tl = languages[lang];
                }
            }

            handle_direction();
            handle_direction();
            q = efuse(params);

            go("http://translate.google.com/#" + sl + "|" + tl + "|" + q);
        }
        , "provides language translation services"
        , "[ query ] [ _ | INTO language ] [ _ | FROM language ]"
        );

//
// Site shortcuts
//
install(["proggit", "p"]
        , function(p) { go("http://reddit.com/r/programming"); }
        , "shortcut to programming.reddit"
        , null);
install(["reddit", "r"]
        , function(p) { go("http://reddit.com"); }
        , "shortcut to reddit"
        , null);
install(["askreddit", "ra"]
        , function(p) { go("http://reddit.com/r/askreddit"); }
        , "shortcut to askreddit"
        , null);
install(["redditpics", "rp"]
        , function(p) { go("http://reddit.com/r/pics"); }
        , "shortcut to redditpics"
        , null);
install(["facebook", "fb", "f"]
        , function(p) { go("http://facebook.com"); }
        , "shortcut to facebook"
        , null);
install(["td"]
        , function(p) { go("http://goo.gl/4ztn"); }
        , "shortcut to torrent damage"
        , null);
install(["gmail", "mail", "m"]
        , function(p) { go("https://mail.google.com"); }
        , "shortcut to gmail"
        , null);
install(["docs"]
        , function(p) { go("http://docs.google.com"); }
        , "shortcut to google docs"
        , null);
install(["calendar", "cal", "c"]
        , function(p) { go("http://goo.gl/K0f8"); }
        , "shortcut to google calendar"
        , null);
install(["craigslist", "cl"]
        , function(p) { go("http://craigslist.org"); }
        , "shortcut to craigslist"
        , null);
install(["smugmug", "mug"]
        , function(p) { go("http://" + settings["smugmug_u"] + ".smugmug.com"); }
        , "shortcut to smugmug"
        , null);
