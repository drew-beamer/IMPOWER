-- CreateTable
CREATE TABLE "award" (
    "awardid" INTEGER NOT NULL,
    "awardname" VARCHAR(64),

    CONSTRAINT "award_pkey" PRIMARY KEY ("awardid")
);

-- CreateTable
CREATE TABLE "event" (
    "eventid" VARCHAR(16) NOT NULL,
    "eventtype" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "week" INTEGER,
    "enddate" DATE NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("eventid")
);

-- CreateTable
CREATE TABLE "eventtype" (
    "eventtype" INTEGER NOT NULL,
    "description" VARCHAR(32) NOT NULL,

    CONSTRAINT "eventtype_pkey" PRIMARY KEY ("eventtype")
);

-- CreateTable
CREATE TABLE "team" (
    "teamid" VARCHAR(12) NOT NULL,
    "teamname" VARCHAR(255) NOT NULL,
    "subregion" VARCHAR(64),
    "country" VARCHAR(40) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("teamid")
);

-- CreateTable
CREATE TABLE "teamaward" (
    "teamid" VARCHAR(12) NOT NULL,
    "eventid" VARCHAR(16) NOT NULL,
    "awardid" INTEGER NOT NULL,
    "isdistrictteam" BOOLEAN,

    CONSTRAINT "teamaward_pkey" PRIMARY KEY ("teamid","eventid","awardid")
);

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_eventtype_fkey" FOREIGN KEY ("eventtype") REFERENCES "eventtype"("eventtype") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teamaward" ADD CONSTRAINT "teamaward_awardid_fkey" FOREIGN KEY ("awardid") REFERENCES "award"("awardid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teamaward" ADD CONSTRAINT "teamaward_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "event"("eventid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teamaward" ADD CONSTRAINT "teamaward_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "team"("teamid") ON DELETE NO ACTION ON UPDATE NO ACTION;

