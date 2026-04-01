import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "cleanup expired contacts",
  {
    hourUTC: 2,
    minuteUTC: 0,
  },
  internal.contact.cleanupExpiredContacts,
);

export default crons;
