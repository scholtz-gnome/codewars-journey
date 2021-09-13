import axios from "axios";
import React, { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import "./App.css";
import ChallengeItem from "./components/challenge-item/challenge-item";
import Nav from "./components/nav/nav";
import { Challenge } from "./interfaces/challenge.interface";
import { ChallengesService } from "./services/chellenges.service";
import { Kyu } from "./types/kyu.enum";
import { Level } from "./types/level.enum";

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>();
  const [kyus, setKyus] = useState<Kyu[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const challengesService = useMemo(() => new ChallengesService(axios), []);

  const onKyuChange = async (e: BaseSyntheticEvent): Promise<void> => {
    const checked: boolean = e.target.checked;

    if (checked) {
      const newKyus: Kyu[] = [...kyus, e.target.value];
      setKyus(newKyus);
      await challengesService.getChallenges(setChallenges, {
        levels,
        kyus: newKyus,
      });
    } else if (!checked) {
      const indexToRemove = kyus.indexOf(e.target.value);
      kyus.splice(indexToRemove, 1);
      setKyus(kyus);
      await challengesService.getChallenges(setChallenges, { levels, kyus });
    }
  };

  const onLevelChange = async (e: BaseSyntheticEvent): Promise<void> => {
    const checked: boolean = e.target.checked;

    if (checked) {
      const newLevels: Level[] = [...levels, e.target.value];
      setLevels(newLevels);
      await challengesService.getChallenges(setChallenges, {
        levels: newLevels,
        kyus,
      });
    } else if (!checked) {
      const indexToRemove = levels.indexOf(e.target.value);
      levels.splice(indexToRemove, 1);
      setLevels(levels);
      await challengesService.getChallenges(setChallenges, { levels, kyus });
    }
  };

  useEffect(() => {
    challengesService.getChallenges(setChallenges, { levels, kyus });
  }, [kyus, levels, challengesService]);

  return (
    <div className="App">
      <Nav onKyuChange={onKyuChange} onLevelChange={onLevelChange} />

      <div>
        <form
          onSubmit={(e: BaseSyntheticEvent) =>
            challengesService.createChallenge(e, setChallenges, {
              levels,
              kyus,
            })
          }
        >
          <div>
            <p>Create a challenge</p>
            <p>The URL is a link to a Codewars challenge</p>
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>

          <div>
            <label htmlFor="url">URL</label>
            <input type="text" name="url" id="url" />
          </div>

          <div>
            <label htmlFor="kyu-select">Choose a Kyu</label>
            <select name="kyu" id="kyu-select">
              <option value="8-kyu">8-kyu</option>
              <option value="7-kyu">7-kyu</option>
              <option value="6-kyu">6-kyu</option>
              <option value="5-kyu">5-kyu</option>
              <option value="4-kyu">4-kyu</option>
              <option value="3-kyu">3-kyu</option>
              <option value="2-kyu">2-kyu</option>
              <option value="1-kyu">1-kyu</option>
            </select>
          </div>

          <div>
            <label htmlFor="level-select">Choose a Level</label>
            <select name="level" id="level-select">
              <option value="beginner">beginner</option>
              <option value="intermediate">intermediate</option>
              <option value="advanced">advanced</option>
            </select>
          </div>
          <button>Create</button>
        </form>
      </div>

      <div>{challenges?.length} results</div>

      <div className="challenge-container">
        {challenges &&
          challenges.map((challenge, i) => (
            <ChallengeItem
              challengeName={challenge.name}
              challengeUrl={challenge.url}
              kyu={challenge.kyu}
              level={challenge.level}
              key={i}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
