import "./challenge-item.css";
import { ChallengeItemProps } from "./challenge-item.interface";

const ChallengeItem: React.FC<ChallengeItemProps> = ({
  challengeUrl,
  challengeName,
  kyu,
  level,
}) => {
  return (
    <div className={`challenge-item ${level}`}>
      <p>
        Name:
        <a href={challengeUrl} target="_blank" rel="noreferrer">
          {challengeName}
        </a>
      </p>
      <p>Kyu: {kyu && kyu}</p>
      <p>Level: {level && level}</p>
    </div>
  );
};

export default ChallengeItem;
