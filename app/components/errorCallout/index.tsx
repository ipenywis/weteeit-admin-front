import React from 'react';
//import styled from 'styled-components';
//import { theme } from 'styles/styled-components';
import { Callout, ICalloutProps, Intent } from '@blueprintjs/core';

export interface IFormError extends ICalloutProps {
  show?: boolean;
}

/*const ErrorContainer = styled.span`
  background-color: ${theme.default.semiDanger};
  padding: 10px;
  color: #000;
  font-size: 16px;
`;
*/
function ErrorCallout(props: IFormError) {
  if (!props.show) return null;
  return (
    <Callout {...props} intent={Intent.DANGER} icon={null}>
      {props.children}
    </Callout>
  );
}

ErrorCallout.defaultProps = {
  show: true,
};

export { ErrorCallout };
