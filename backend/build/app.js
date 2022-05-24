"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _userRouter = _interopRequireDefault(require("./routes/user-router"));

var _sqlRelationships = _interopRequireDefault(require("./config/sql-relationships"));

var _chatRouter = _interopRequireDefault(require("./routes/chat-router"));

var _resourcesMiddleware = _interopRequireDefault(require("./middlewares/resources-middleware"));

var _winnerMiddleware = _interopRequireDefault(require("./middlewares/winner-middleware"));

var _mapRouter = _interopRequireDefault(require("./routes/map-router"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _kingdomRouter = _interopRequireDefault(require("./routes/kingdom-router"));

var _troopsRouter = _interopRequireDefault(require("./routes/troops-router"));

var _buildingRouter = _interopRequireDefault(require("./routes/building-router"));

var _battleRouter = _interopRequireDefault(require("./routes/battle-router"));

var _unitLevelRouter = _interopRequireDefault(require("./routes/unit-level-router"));

var _leaderboardRouter = _interopRequireDefault(require("./routes/leaderboard-router"));

var _battleMiddleware = _interopRequireDefault(require("./middlewares/battle-middleware"));

var _loginMiddleware = _interopRequireDefault(require("./middlewares/login-middleware"));

var _settlersRouter = _interopRequireDefault(require("./routes/settlers-router"));

var _settlersMiddleware = _interopRequireDefault(require("./middlewares/settlers-middleware"));

var _banditsMiddleware = _interopRequireDefault(require("./middlewares/bandits-middleware"));

var _cors = _interopRequireDefault(require("cors"));

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
(0, _sqlRelationships["default"])();
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_userRouter["default"]); // ↑↑↑↑↑↑↑↑↑↑↑ everything without login

app.use(_loginMiddleware["default"]); // ↓↓↓↓↓↓↓↓↓↓↓ only for logged in users

app.use(_winnerMiddleware["default"]);
app.use(_resourcesMiddleware["default"]);
app.use(_battleMiddleware["default"]);
app.use(_settlersMiddleware["default"]);
app.use(_banditsMiddleware["default"]);
app.use(_kingdomRouter["default"]);
app.use(_chatRouter["default"]);
app.use(_mapRouter["default"]);
app.use(_troopsRouter["default"]);
app.use(_buildingRouter["default"]);
app.use(_battleRouter["default"]);
app.use(_settlersRouter["default"]);
app.use(_unitLevelRouter["default"]);
app.use(_leaderboardRouter["default"]);
app.listen(process.env.PORT || 3000);
//# sourceMappingURL=app.js.map