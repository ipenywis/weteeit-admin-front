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
  makeSelectTeams,
} from './selectors';
import {
  openEditPopover,
  closeEditPopover,
  openDeleteAlert,
  closeDeleteAlert,
  loadTeams,
  removeTeam,
} from './actions';
import AddNewTeam from './addNewTeam';
import { ITeamPageState, ITeam } from './type';

interface ITeamsDispatchProps {
  openEditPopover: (teamId: string) => void;
  closeEditPopover: () => void;
  openDeleteAlert: (teamId: ITeam['id']) => void;
  closeDeleteAlert: () => void;
  loadTeams: () => void;
  removeTeam: (id: ITeam['id']) => void;
}

export interface ITeamsProps extends ITeamsDispatchProps, ITeamPageState {}

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
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

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
  teamId: ITeam['id'];
  teamName: string;
  currentDeleteActiveAlert: ITeamPageState['currentActiveDeleteAlert'];
  toaster: IToaster | null;
  openDeleteAlert: ITeamsDispatchProps['openDeleteAlert'];
  closeDeleteAlert: ITeamsDispatchProps['closeDeleteAlert'];
  onClick: (teamId: ITeam['id']) => void;
}) {
  const {
    teamId,
    openDeleteAlert,
    currentDeleteActiveAlert,
    teamName,
    closeDeleteAlert,
    toaster,
    onClick,
  } = props;

  const deleteTeam = () => {
    //TODO: Send Query here
    onClick(teamId);
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
    const { teams } = this.props;

    const isTeamsValid = teams && teams.length > 0;

    return (
      <FlexCard
        header="Available Teams"
        interactive
        onClick={this.onLoadTeams.bind(this)}
      >
        {!isTeamsValid && <b>No Teams Available!</b>}
        {isTeamsValid &&
          teams.map((team, idx) => {
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
                    teamId={team.id}
                    teamName={team.name}
                    toaster={this.toaster}
                    currentDeleteActiveAlert={
                      this.props.currentActiveDeleteAlert
                    }
                    openDeleteAlert={this.props.openDeleteAlert}
                    closeDeleteAlert={this.props.closeDeleteAlert}
                    onClick={id => this.props.removeTeam(id)}
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
  openDeleteAlert: (teamId: ITeam['id']) => disptach(openDeleteAlert(teamId)),
  closeDeleteAlert: () => disptach(closeDeleteAlert()),
  loadTeams: () => disptach(loadTeams()),
  removeTeam: (id: ITeam['id']) => disptach(removeTeam(id)),
});

const mapStateToProps = createSelector(
  makeSelectCurrentOpenEditPopover(),
  makeSelectCurrentActiveDeleteAlert(),
  makeSelectTeams(),
  (currentOpenEdit, currentActiveDeleteAlert, teams): ITeamPageState => ({
    currentOpenEdit,
    currentActiveDeleteAlert,
    teams,
  }),
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);
