import { BaseSyntheticEvent } from "react";
import { Kyu } from "../../types/kyu.enum";
import { Level } from "../../types/level.enum";
import { NavProps } from "./interfaces/nav-props.interface";
import "./nav.css";

const Nav: React.FC<NavProps> = ({ onKyuChange, onLevelChange }) => {
  const kyus: Kyu[] = [
    Kyu.ONE,
    Kyu.TWO,
    Kyu.THREE,
    Kyu.FOUR,
    Kyu.FIVE,
    Kyu.SIX,
    Kyu.SEVEN,
    Kyu.EIGHT,
  ];

  const levels: Level[] = [Level.BEGINNER, Level.INTERMEDIATE, Level.ADVANCED];

  return (
    <nav className="nav">
      <div className="kyus">
        {kyus &&
          kyus.map((kyu, i) => (
            <div key={i}>
              <label htmlFor={kyu}>{kyu}</label>
              <input
                name={kyu}
                type="checkbox"
                value={kyu}
                onClick={(e: BaseSyntheticEvent) => onKyuChange(e)}
              />
            </div>
          ))}
      </div>

      <div className="levels">
        {levels &&
          levels.map((level, i) => (
            <div key={i}>
              <label htmlFor={level}>{level}</label>
              <input
                name={level}
                type="checkbox"
                value={level}
                onClick={(e: BaseSyntheticEvent) => onLevelChange(e)}
              />
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Nav;
