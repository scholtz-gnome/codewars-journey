import { ChallengeProps } from "./challenge.interface";

const Challenge: React.FC<ChallengeProps> = ({
  challengeUrl,
  challengeName,
}) => {
  return (
    <div>
      <li>
        <a href={challengeUrl} target="_blank" rel="noreferrer">
          {challengeName}
        </a>
      </li>
    </div>
  );
};

export default Challenge;
