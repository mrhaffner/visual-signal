import { StyledText, StyledLink } from './style';

interface Props {
  memberFound: boolean;
  logOut: () => void;
}

const MainText = ({ memberFound, logOut }: Props) => {
  return (
    <>
      {memberFound ? (
        <StyledText>
          This page may be private. If someone gave you this link, they may need
          to invite you to one of their boards or Workspaces.
        </StyledText>
      ) : (
        <StyledText>
          This page may be private. You may be able to view it by{' '}
          <StyledLink onClick={logOut}>logging in</StyledLink>.
        </StyledText>
      )}
    </>
  );
};

export default MainText;
