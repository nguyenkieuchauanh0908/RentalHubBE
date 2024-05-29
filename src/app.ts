/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import DBconnect from "./database/database";
import route from "./modules/posts/posts.route";
import routerUser from "./modules/user/routes/user.route";
import erroHandler from "./helpers/handle-errors";
import { initializeApp } from "firebase/app";
import config from "./database/firebase.config";
import routerImg from "./modules/image/image.route";
import inspectorRoute from "./modules/user/routes/inspectors.route";
import notifiRoute from "./modules/notification/notification.route";
import adminRoute from "./modules/user/routes/admin.route";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import statisRoute from "./modules/statistic/statistic.route";
import "./modules/auth/passport";
import authRoute from "./modules/auth/auth.route";
import chatRoute from "./modules/chats/chat.route";
import messageRoute from "./modules/messages/message.route";
import http from "http";
//import { Server } from "socket.io";
import { initSocket } from "./modules/socket/socket"
import socialRoute from "./modules/social-posts/social-posts.route";
import cookieParser from "cookie-parser";
//import bodyParser from "body-parser";

(async () => {
  const app = express();
  const server = http.createServer(app);
  //Config allow ports
  const allowedOrigins = [
    "http://localhost:4200",
    "http://localhost:4201",
    "http://localhost:4202",
  ];
  //Setup cors options
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  //Config socket.io
  //const io = new Server(server, { cors: corsOptions });
  // //List of online users
  // let onlineUsers: { userId: string; socketId: string }[] = [];
  // let onlineInspectors: { userId: string; socketId: string }[] = [];
  // const onlineAdmins = {
  //   userId: "65418310bec0ba49c4d9a276",
  //   socketId: "",
  // };

  const port = 3000;
  dayjs.extend(utc);
  dayjs.extend(timezone);
  //dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

  //Init socket
  const io = initSocket(server, corsOptions);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(morgan("combined"));
  app.use(cookieParser());
  app.set("view engine", "ejs");

  await DBconnect();

  //Initialize a firebase application
  initializeApp(config.firebaseConfig);

  app.use("/api/users", routerUser);
  app.use("/api/posts", route);
  app.use("/api/notification", notifiRoute);
  app.use("/api/upload", routerImg);
  app.use("/api/inspector", inspectorRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/statistic", statisRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/chat", chatRoute);
  app.use("/api/message", messageRoute);
  app.use("/api/social", socialRoute);
  app.use("/api/reaction", socialRoute);

  app.use(erroHandler);

  server.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
