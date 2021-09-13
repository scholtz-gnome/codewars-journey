import { AxiosInstance, AxiosRequestConfig } from "axios";
import React, { BaseSyntheticEvent } from "react";
import { CreateChallengeDto } from "../dtos/create-challenge.dto";
import { Challenge } from "../interfaces/challenge.interface";
import { Kyu } from "../types/kyu.enum";
import { Level } from "../types/level.enum";

export class ChallengesService {
  constructor(private readonly axios: AxiosInstance) {}

  async getChallenges(
    setChallenges: React.Dispatch<
      React.SetStateAction<Challenge[] | undefined>
    >,
    params: { kyus: Kyu[]; levels: Level[] }
  ): Promise<void> {
    const config: AxiosRequestConfig = {
      params,
      withCredentials: true,
    };
    const res = await this.axios.get(
      "https://codewars-journey-api.herokuapp.com/challenges",
      config
    );

    setChallenges(res.data.challenges);
  }

  async createChallenge(
    e: BaseSyntheticEvent,
    setChallenges: React.Dispatch<
      React.SetStateAction<Challenge[] | undefined>
    >,
    params: { kyus: Kyu[]; levels: Level[] }
  ): Promise<void> {
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

    await this.axios.post(
      "https://codewars-journey-api.herokuapp.com/challenges",
      createChallengeDto,
      { withCredentials: true }
    );
    await this.getChallenges(setChallenges, params);

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.name === "url" || input.name === "name") {
        input.value = "";
      }
    });
  }
}
