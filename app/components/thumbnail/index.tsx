import React from 'react';
import styled from 'styled-components';
import { css, theme } from 'styles/styled-components';

export interface IThumbnailProps {
  src: string;
  previewText: string;
  alt?: string;

  size?: 'S' | 'M' | 'L' | 'XL';
}

const ThumbnailContainer = styled.div`
  ${(props: IThumbnailProps) => {
    let size = '8em';
    switch (props.size) {
      case 'S':
        size = '8em';
        break;
      case 'M':
        size = '12em';
        break;
      case 'L':
        size = '16em';
        break;
      case 'XL':
        size = '20em';
        break;
    }
    return css`
      width: ${size};
      height: ${size};
    `;
  }};

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 18px 2px rgba(15, 15, 15, 0.2);
  margin-bottom: 1.2em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PreviewText = styled.small`
  font-size: 14px;
  color: ${theme.default.semiDark};
`;

export function Thumbnail(props: IThumbnailProps) {
  const { src, alt, previewText } = props;

  const isValidImg = src && src.trim() !== '';

  return (
    <ThumbnailContainer {...props}>
      {isValidImg && <img src={src} alt={alt} />}
      {!isValidImg && <PreviewText>{previewText}</PreviewText>}
    </ThumbnailContainer>
  );
}
