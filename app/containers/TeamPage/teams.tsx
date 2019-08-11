import React from 'react';
import { Card } from 'components/card';
import styled from 'styled-components';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import {
  Button,
  Intent,
  Popover,
  Alert,
  IToaster,
  Toaster,
} from '@blueprintjs/core';
import { theme } from 'styles/styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  makeSelectCurrentOpenEditPopover,
  makeSelectCurrentActiveDeleteAlert,
} from './selectors';
import {
  openEditPopover,
  closeEditPopover,
  openDeleteAlert,
  closeDeleteAlert,
  loadTeams,
} from './actions';
import AddNewTeam from './addNewTeam';
import { ITeamPageState } from './type';

interface ITeamsDispatchProps {
  openEditPopover: (teamId: string) => void;
  closeEditPopover: () => void;
  openDeleteAlert: (teamId: string) => void;
  closeDeleteAlert: () => void;
  loadTeams: () => void;
}

export interface ITeamsProps extends ITeamsDispatchProps {
  currentOpenEditPopover: ITeamPageState['currentOpenEdit'];
  currentActiveDeleteAlert: ITeamPageState['currentActiveDeleteAlert'];
}

const FlexCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5em;
`;

const LeftSide = styled(HorizontalWrapper)`
  flex: 1;
`;

const RightSide = styled(HorizontalWrapper)`
  justify-content: flex-end;
`;

const TeamItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3em;
  background-color: ${theme.default.itemBackground};
  padding: 20px;
  margin-bottom: 1em;
  transition: all 200ms ease-in-out;
  box-shadow: 0px 0px 5px 0px rgba(15, 15, 15, 0.2);

  &:hover {
    filter: contrast(0.94);
  }
`;

const TeamLogo = styled.div`
  width: 2em;
  border-radius: 50%;
  margin-right: 2em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const TeamName = styled.div`
  font-size: 18px;
  color: #000;
  margin-right: 2em;
`;

const TeamSlogan = styled.div`
  width: 15%;
  min-width: 3em;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FAKE_LOGO =
  'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/ES_S%C3%A9tif_%28logo%29_2.png/220px-ES_S%C3%A9tif_%28logo%29_2.png';

const FAKE_TEAMS = [
  {
    id: '0',
    name: 'ESS Setif',
    slogan: 'Entent Sportif Setifienne',
    logo: FAKE_LOGO,
  },
  {
    id: '1',
    name: 'ESS Setif',
    slogan: 'Entent Sportif Setifienne',
    logo: FAKE_LOGO,
  },
  {
    id: '2',
    name: 'ESS Setif',
    slogan: 'Entent Sportif Setifienne',
    logo: FAKE_LOGO,
  },
  {
    id: '3',
    name: 'ESS Setif',
    slogan: 'Entent Sportif Setifienne',
    logo: FAKE_LOGO,
  },
];

function EditTeamButton(props: {
  openTeamEdit: ITeamsDispatchProps['openEditPopover'];
  teamKey: string;
  name: string;
  slogan: string;
}) {
  const { openTeamEdit, teamKey, name, slogan } = props;

  return (
    <Popover
      target={
        <Button
          icon="edit"
          onClick={() => openTeamEdit(teamKey)}
          intent={Intent.PRIMARY}
          minimal
        />
      }
      content={
        <AddNewTeam
          header="Edit Team"
          footer="Update"
          name={name}
          slogan={slogan}
        />
      }
    />
  );
}

function DeleteTeamButton(props: {
  teamId: string;
  teamName: string;
  currentDeleteActiveAlert: string | null;
  toaster: IToaster | null;
  openDeleteAlert: ITeamsDispatchProps['openDeleteAlert'];
  closeDeleteAlert: ITeamsDispatchProps['closeDeleteAlert'];
}) {
  const {
    teamId,
    openDeleteAlert,
    currentDeleteActiveAlert,
    teamName,
    closeDeleteAlert,
    toaster,
  } = props;

  const deleteTeam = () => {
    //TODO: Send Query here
    //TODO: Remove Team from state
    toaster &&
      (toaster as IToaster).show({
        message: `${teamName} Team has been successfully Removed!`,
        intent: Intent.SUCCESS,
      });
    closeDeleteAlert();
  };

  return (
    <div>
      <Button
        icon="cross"
        onClick={() => openDeleteAlert(teamId)}
        intent={Intent.DANGER}
        minimal
      />
      <Alert
        isOpen={currentDeleteActiveAlert === teamId}
        onCancel={closeDeleteAlert}
        onConfirm={deleteTeam}
        intent={Intent.DANGER}
        icon="trash"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
      >
        Are you sure you want to Completely Delete {teamName} Team?
      </Alert>
    </div>
  );
}

class Teams extends React.Component<ITeamsProps> {
  private toaster: IToaster | null;

  constructor(props: ITeamsProps) {
    super(props);
    this.toaster = null;
  }

  openTeamEdit(teamKey: string) {
    this.props.openEditPopover(teamKey);
  }

  componentDidMount() {}

  onLoadTeams() {
    this.props.loadTeams();
  }

  render() {
    return (
      <FlexCard
        header="Available Teams"
        interactive
        onClick={this.onLoadTeams.bind(this)}
      >
        {FAKE_TEAMS.map((team, idx) => {
          const teamKey = `${team.name}-${idx}`;
          return (
            <TeamItem key={teamKey}>
              <LeftSide>
                <TeamLogo>
                  <img src={team.logo || '#'} alt="team-logo" />
                </TeamLogo>
                <TeamName>{team.name}</TeamName>
                <TeamSlogan>{team.slogan}</TeamSlogan>
              </LeftSide>
              <RightSide>
                <EditTeamButton
                  openTeamEdit={this.openTeamEdit.bind(this)}
                  teamKey={teamKey}
                  {...team}
                />
                <DeleteTeamButton
                  teamId={teamKey}
                  teamName={team.name}
                  toaster={this.toaster}
                  currentDeleteActiveAlert={this.props.currentActiveDeleteAlert}
                  openDeleteAlert={this.props.openDeleteAlert}
                  closeDeleteAlert={this.props.closeDeleteAlert}
                />
              </RightSide>
            </TeamItem>
          );
        })}
        <Toaster ref={ref => (this.toaster = ref)} />
      </FlexCard>
    );
  }
}

const mapDispatchToProps = (disptach: Dispatch): ITeamsDispatchProps => ({
  openEditPopover: (teamId: string) => disptach(openEditPopover(teamId)),
  closeEditPopover: () => disptach(closeEditPopover()),
  openDeleteAlert: (teamId: string) => disptach(openDeleteAlert(teamId)),
  closeDeleteAlert: () => disptach(closeDeleteAlert()),
  loadTeams: () => disptach(loadTeams()),
});

const mapStateToProps = createSelector(
  makeSelectCurrentOpenEditPopover(),
  makeSelectCurrentActiveDeleteAlert(),
  (currentOpenEditPopover, currentActiveDeleteAlert) => ({
    currentOpenEditPopover,
    currentActiveDeleteAlert,
  }),
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);
