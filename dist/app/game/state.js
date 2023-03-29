export var State;
(function (State) {
    State[State["PLAYER"] = 0] = "PLAYER";
    State[State["BOT"] = 1] = "BOT";
    State[State["WIN"] = 2] = "WIN";
    State[State["LOSE"] = 3] = "LOSE";
    State[State["TIE"] = 4] = "TIE";
})(State || (State = {}));
