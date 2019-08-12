import React, { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export interface IAppLoadingProps {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  showLoadingText?: boolean;
}

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CSSAnimation = createGlobalStyle`
  @-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
`;

function decideSize(size: string): string {
  switch (size) {
    case 'S':
      return '5px';
    case 'M':
      return '15px';
    case 'L':
      return '25px';
    case 'XL':
      return '45px';
    case 'XXL':
      return '55px';
    default:
      return '40px';
  }
}

const Spinner = styled.div`
  width: ${(props: IAppLoadingProps) => decideSize(props.size)};
  height: ${(props: IAppLoadingProps) => decideSize(props.size)};

  position: relative;
`;

const DoubleBounce = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #2980b9;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
`;

const DoubleBounce2 = styled(DoubleBounce)`
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`;

const LoadingText = styled.div`
  display: flex;
  font-size: 13px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  color: #3d3d3d;
  margin-top: 10px;
`;

function AppLoading(props: IAppLoadingProps) {
  const [loadingDots, setDots] = useState(0);

  //Simulate loading text dots animation (ex: loading. => loading.. => loading...)
  setTimeout(
    () => (loadingDots === 3 ? setDots(0) : setDots(loadingDots + 1)),
    1000,
  );

  return (
    <LoadingContainer>
      <Spinner {...props}>
        <CSSAnimation />
        <DoubleBounce />
        <DoubleBounce2 />
      </Spinner>
      {props.showLoadingText && (
        <LoadingText>
          loading{loadingDots === 1 && '.'}
          {loadingDots === 2 && '..'}
          {loadingDots === 3 && '...'}
        </LoadingText>
      )}
    </LoadingContainer>
  );
}

AppLoading.defaultProps = {
  size: 'M',
  showLoadingText: true,
};

export { AppLoading };
