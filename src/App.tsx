import axios, { AxiosRequestConfig } from "axios";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import ChallengeItem from "./components/challenge-item";
import { Challenge } from "./interfaces/challenge.interface";

export enum Kyu {
  ONE = "1-kyu",
  TWO = "2-kyu",
  THREE = "3-kyu",
  FOUR = "4-kyu",
  FIVE = "5-kyu",
  SIX = "6-kyu",
  SEVEN = "7-kyu",
  EIGHT = "8-kyu",
}

export enum Level {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

interface CreateChallengeDto {
  name: string;
  url: string;
  kyu: Kyu;
  level: Level;
}

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>();
  const [kyus, setKyus] = useState<Kyu[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);

  const getChallenges = async (
    setChallenges: React.Dispatch<
      React.SetStateAction<Challenge[] | undefined>
    >,
    params: { kyus: Kyu[]; levels: Level[] }
  ): Promise<void> => {
    const config: AxiosRequestConfig = {
      params,
      withCredentials: true,
    };
    const res = await axios.get(
      "https://codewars-journey-api.herokuapp.com/challenges",
      config
    );

    setChallenges(res.data.challenges);
  };

  const createChallenge = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const url = e.target.url.value.trim();
    const kyu = e.target.kyu.value.trim();
    const level = e.target.level.value.trim();
    const createChallengeDto: CreateChallengeDto = {
      name,
      url,
      kyu,
      level,
    };

    await axios.post(
      "https://codewars-journey-api.herokuapp.com/challenges",
      createChallengeDto,
      { withCredentials: true }
    );
    await getChallenges(setChallenges, { levels, kyus });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.name === "url" || input.name === "name") {
        input.value = "";
      }
    });
  };

  const onKyuChange = async (e: BaseSyntheticEvent): Promise<void> => {
    const checked: boolean = e.target.checked;

    if (checked) {
      const newKyus: Kyu[] = [...kyus, e.target.value];
      setKyus(newKyus);
      await getChallenges(setChallenges, { levels, kyus: newKyus });
    } else if (!checked) {
      const indexToRemove = kyus.indexOf(e.target.value);
      kyus.splice(indexToRemove, 1);
      setKyus(kyus);
      await getChallenges(setChallenges, { levels, kyus });
    }
  };

  const onLevelChange = async (e: BaseSyntheticEvent): Promise<void> => {
    const checked: boolean = e.target.checked;

    if (checked) {
      const newLevels: Level[] = [...levels, e.target.value];
      setLevels(newLevels);
      await getChallenges(setChallenges, { levels: newLevels, kyus });
    } else if (!checked) {
      const indexToRemove = levels.indexOf(e.target.value);
      levels.splice(indexToRemove, 1);
      setLevels(levels);
      await getChallenges(setChallenges, { levels, kyus });
    }
  };

  useEffect(() => {
    getChallenges(setChallenges, { levels, kyus });
  }, [kyus, levels]);

  return (
    <div className="App">
      <header>Welcome to Codewars Journey</header>
      <div>
        <p>Filter challenges by kyu</p>
        <div>
          <label htmlFor="1-kyu">1-kyu</label>
          <input
            name="1-kyu"
            type="checkbox"
            value="1-kyu"
            onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
          />
        </div>

        <div>
          <label htmlFor="2-kyu">2-kyu</label>
          <input
            name="2-kyu"
            type="checkbox"
            value="2-kyu"
            onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
          />
        </div>

        <div>
          <label htmlFor="kyu">3-kyu</label>
          <input
            name="3-kyu"
            type="checkbox"
            value="3-kyu"
            onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
          />
        </div>

        <div>
          <label htmlFor="kyu">4-kyu</label>
          <input
            name="4-kyu"
            type="checkbox"
            value="4-kyu"
            onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
          />
        </div>

        <label htmlFor="kyu">5-kyu</label>
        <input
          name="5-kyu"
          type="checkbox"
          value="5-kyu"
          onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
        />

        <div>
          <label htmlFor="kyu">6-kyu</label>
          <input
            name="6-kyu"
            type="checkbox"
            value="6-kyu"
            onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
          />
        </div>

        <label htmlFor="kyu">7-kyu</label>
        <input
          name="6-kyu"
          type="checkbox"
          value="7-kyu"
          onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
        />

        <div>
          <label htmlFor="kyu">8-kyu</label>
          <input
            name="8-kyu"
            type="checkbox"
            value="8-kyu"
            onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
          />
        </div>
      </div>

      <div>
        <p>Filter challenges by level</p>
        <div>
          <label htmlFor="beginner">beginner</label>
          <input
            name="beginner"
            type="checkbox"
            value="beginner"
            onClick={(e: BaseSyntheticEvent) => onLevelChange(e)}
          />
        </div>

        <div>
          <label htmlFor="intermediate">intermediate</label>
          <input
            name="intermediate"
            type="checkbox"
            value="intermediate"
            onClick={(e: BaseSyntheticEvent) => onLevelChange(e)}
          />
        </div>

        <div>
          <label htmlFor="advanced">advanced</label>
          <input
            name="advanced"
            type="checkbox"
            value="advanced"
            onClick={(e: BaseSyntheticEvent) => onLevelChange(e)}
          />
        </div>
      </div>

      <div>
        <form onSubmit={(e: BaseSyntheticEvent) => createChallenge(e)}>
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
