import { StyledText, StyledLink } from './style';

interface Props {
  memberFound: boolean;
  goToLogin: () => void;
}

const MainText = ({ memberFound, goToLogin }: Props) => {
  return (
    <>
      {memberFound ? (
        <StyledText>
          This page may be private. If someone gave you this link, they may need
          to invite you to one of their boards.
        </StyledText>
      ) : (
        <StyledText>
          This page may be private. You may be able to view it by{' '}
          <StyledLink onClick={goToLogin}>logging in</StyledLink>.
        </StyledText>
      )}
    </>
  );
};

export default MainText;
