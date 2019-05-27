/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';
import { RootState } from 'containers/App/types';


interface OwnProps {
  item: any; // Too many fields.
}

interface StateProps {
  currentUser: string;
}

// tslint:disable-next-line:no-empty-interface
interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps;

export function RepoListItem(props: Props) {
  const { item } = props;
  let nameprefix = '';

  // If the repository is owned by a different person than we got the data for
  // it's a fork and we should show the name of the owner
  if (item.owner.login !== props.currentUser) {
    nameprefix = `${item.owner.login}/`;
  }

  // Put together the content of the repository
  const content = (
    <Wrapper>
      <RepoLink href={item.html_url} target="_blank">
        {nameprefix + item.name}
      </RepoLink>
      <IssueLink href={`${item.html_url}/issues`} target="_blank">
        <IssueIcon />
        <FormattedNumber value={item.open_issues_count} />
      </IssueLink>
    </Wrapper>
  );

  // Render the content into a list item
  return <ListItem key={`repo-list-item-${item.full_name}`} item={content} />;
}

export default connect(
  createStructuredSelector<RootState, StateProps>({
    currentUser: makeSelectCurrentUser(),
  }),
)(RepoListItem);
