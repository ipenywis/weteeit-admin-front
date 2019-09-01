import React from 'react';
import styled from 'styled-components';
import { Card } from 'components/card';
import { VerticalWrapper } from 'components/verticalWrapper';
import { Form } from 'components/form';
import FinalFormSpy from '../../finalFormSpy';
import { MenuItem } from '@blueprintjs/core';
import { DateTimeInput } from 'components/dateTimeInput';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectTeams } from 'containers/TeamPage/selectors';
import { ITeam } from 'containers/TeamPage/type';
import { Suggest } from 'components/suggest';
import {
  ItemRenderer,
  IItemRendererProps,
  ItemPredicate,
} from '@blueprintjs/select';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import { theme } from 'styles/styled-components';
import { TimePicker } from 'components/timePicker';
import { FormGroup } from 'components/formGroup';

interface IMatchFormState {
  teams: ITeam[];
}

export interface IMatchFormProps extends IMatchFormState {
  header: string;
}

const VSTeamIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  margin: 1.8em 5px;
  color: ${theme.default.primary};
`;

function TeamValueRenderer(item: ITeam) {
  return item.name;
}

const TeamItemRenderer: ItemRenderer<ITeam> = (
  team: ITeam,
  { modifiers, handleClick, query }: IItemRendererProps,
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${team.name}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={`#${team.id.toString()}`}
      key={team.id}
      onClick={handleClick}
      text={text}
    />
  );
};

export const filterTeam: ItemPredicate<ITeam> = (
  query,
  team,
  _index,
  exactMatch,
) => {
  const normalizedTitle = team.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${normalizedTitle} #${team.id}`.indexOf(normalizedQuery) >= 0;
  }
};
const teamsEqual = (team1: ITeam, team2: ITeam) => team1.id === team2.id;

const noResult = <MenuItem disabled={true} text="No results." />;

const TeamSuggest = ({ name, teams }: { name: string; teams: ITeam[] }) => (
  <Suggest
    name={name}
    items={teams}
    onItemSelect={(item: ITeam) => item.id}
    inputValueRenderer={TeamValueRenderer}
    itemRenderer={TeamItemRenderer}
    noResults={noResult}
    itemsEqual={teamsEqual}
    isActiveItem={id => teams.find(team => team.id === id) || null}
    itemPredicate={filterTeam}
  />
);

//TODO: Add Stadium Suggest
function MatchForm(props: IMatchFormProps) {
  const { header, teams } = props;

  const onSubmit = () => {
    //TODO: Add data submission
  };

  return (
    <Card large header={header} interactive={true} standalone>
      <Form onSubmit={onSubmit}>
        {() => {
          return (
            <VerticalWrapper>
              <FinalFormSpy form="matchForm" />
              <HorizontalWrapper noMargin>
                <FormGroup label="Team1">
                  <TeamSuggest name="team1" teams={teams} />
                </FormGroup>
                <FormGroup />
                <VSTeamIconContainer>
                  <div>VS</div>
                </VSTeamIconContainer>
                <FormGroup label="Team2">
                  <TeamSuggest name="team2" teams={teams} />
                </FormGroup>
              </HorizontalWrapper>
              <HorizontalWrapper noMargin width="100%" spaceEvenly>
                <FormGroup label="Match Date">
                  <DateTimeInput
                    name="date"
                    initialValue={new Date()}
                    showActionsBar
                  />
                </FormGroup>
                <FormGroup label="Match Time">
                  <TimePicker name="time" showArrowButtons />
                </FormGroup>
              </HorizontalWrapper>
              <FormGroup label="Stadium">
                <TeamSuggest name="team1" teams={teams} />
              </FormGroup>
            </VerticalWrapper>
          );
        }}
      </Form>
    </Card>
  );
}

const mapStateToProps = createSelector(
  makeSelectTeams(),
  teams =>
    ({
      teams,
    } as IMatchFormState),
);

export default connect(
  mapStateToProps,
  null,
)(MatchForm);
