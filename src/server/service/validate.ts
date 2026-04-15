import { Mode } from "@/lib/game/enum";
import { EndGameResult, VEndGameResult } from "@/lib/game/types";
import objectHash from "object-hash";

export const validateGameResult = (body: EndGameResult): boolean => {
  const isValid =
    VEndGameResult.Check(body) &&
    validateHash(body) &&
    validateTime(body) &&
    validateTarget(body) &&
    validateMode(body);

  if (!isValid) {
    return false;
  }

  // valid game
  return true;
};

type Validator = (body: EndGameResult) => boolean;

export const validateHash: Validator = (body) => {
  const { config, result, hash } = body;
  const gameHash = objectHash({ config, result });

  return hash === gameHash;
};

export const validateTime: Validator = (body) => {
  const { startTime, duration } = body;

  const currentTime = Date.now();
  const calculatedFinishTime = startTime + duration;

  const timeDelta = currentTime - calculatedFinishTime;

  // allow slight client/server drift
  const isValid = timeDelta > -1000 && timeDelta < 5000;

  return isValid;
};

export const validateTarget: Validator = (body) => {
  const { result } = body;
  const { clicks, hits, incorrect } = result;

  const sum = hits + incorrect;

  if (sum >= clicks) {
    return false;
  }

  return true;
};

export const validateMode: Validator = (body) => {
  const { result, config, duration } = body;
  const { hits } = result;
  const { mode, mode2 } = config;

  if (mode === Mode.characters) {
    const isValid = mode2 === hits;
    return isValid;
  }

  if (config.mode === Mode.time) {
    const threshold = 0.2;

    const diff = Math.abs(duration - mode2);
    const isValid = diff < threshold;
    return isValid;
  }

  console.log("unhandled mode");
  return true;
};
