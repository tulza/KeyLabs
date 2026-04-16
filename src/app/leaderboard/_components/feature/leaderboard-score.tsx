import { useQueryState } from "nuqs";
import { PropsWithChildren } from "react";
import { GlobeIcon, TimeIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { capitalize } from "radash";

const leaderboardTime = [15, 30, 60];
const leaderboardWordset = ["english", "any"];

export const LeaderboardScore = () => {
  const [time, setTime] = useQueryState("time", { defaultValue: "30" });
  const [wordset, setWordset] = useQueryState("wordset", {
    defaultValue: "english",
  });

  return (
    <div className="mb-12 grid h-full grow grid-cols-12 gap-12">
      <div className="col-span-3 flex flex-col gap-3">
        <SelectContainer>
          <Button variant="secondary">All Time</Button>
          <Button variant="outline">Daily</Button>
        </SelectContainer>
        <SelectContainer>
          <Button variant="secondary">Letter per Minute</Button>
          {/* <Button>Score</Button> */}
        </SelectContainer>
        <SelectContainer>
          {leaderboardTime.map((t) => (
            <Button
              key={t}
              variant={time === String(t) ? "secondary" : "outline"}
              onClick={() => setTime(String(t))}
            >
              <TimeIcon />
              Time {t}
            </Button>
          ))}
        </SelectContainer>
        <SelectContainer>
          {leaderboardWordset.map((item) => (
            <Button
              key={item}
              onClick={() => setWordset(item)}
              variant={wordset === item ? "secondary" : "outline"}
            >
              <GlobeIcon />
              {item}
            </Button>
          ))}
        </SelectContainer>
      </div>
      <div className="col-span-9 size-full h-full rounded">
        <h3 className="h-9 font-serif text-3xl">
          {capitalize(wordset)} Time {time} Leaderboard
        </h3>
        <p>{new Date().toDateString()}</p>
        <LeaderboardList />
      </div>
    </div>
  );
};

const SelectContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded border border-border bg-muted p-1 *:justify-start">
      {children}
    </div>
  );
};

const LeaderboardList = () => {
  return (
    <div className="size-full">
      {Array.from({ length: 25 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-border border-b p-3 even:bg-secondary/10"
        >
          <div className="flex items-center gap-3">
            <span className="text-icon">{index + 1}</span>
            <div className="flex items-center gap-2">
              <span className="text-icon">A</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
