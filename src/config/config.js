import { fileURLToPath } from "url";
import { dirname, join } from "path";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = join(dirname(__filename), "../../");

dotenv.config();

const USERMONGODB = process.env.USERMONGODB
const PASSWORDMONGODB = process.env.PASSWORDMONGODB
const SERVER_PORT = process.env.SERVER_PORT
const SESSION_SECRET = process.env.SESSION_SECRET
const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD
const MAIL_GMAIL_USER = process.env.MAIL_GMAIL_USER
const MAIL_GMAIL_PASSWORD = process.env.MAIL_GMAIL_PASSWORD

export const config = {
  session: {
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${USERMONGODB}:${PASSWORDMONGODB}@cluster0.noki4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      ttl: 12000,
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  },

  PORT: SERVER_PORT,
  db: {
    connectionString: `mongodb+srv://${USERMONGODB}:${PASSWORDMONGODB}@cluster0.noki4.mongodb.net/BackEndIII?retryWrites=true&w=majority&appName=Cluster0`,
  },
  cookiePassword: COOKIE_PASSWORD,
  MAIL_GMAIL_USER: MAIL_GMAIL_USER,
  MAIL_GMAIL_PASSWORD: MAIL_GMAIL_PASSWORD,
}
