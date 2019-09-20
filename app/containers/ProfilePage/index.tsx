import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import PersonalInfo from './personalInfo';
import { IPersonalInfo } from './type';
import AccountDetails from './accountDetails';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeSelectAuthAdmin } from 'containers/App/selectors';
import { IAuthAdmin } from 'containers/loginPage/type';

interface IProfilePageInfo {
  authAdmin: IAuthAdmin;
}

function ProfilePage(props: IProfilePageInfo) {
  const { authAdmin } = props;

  const personalInfo: IPersonalInfo = {
    username: authAdmin.username,
    email: authAdmin.email,
    fullName: 'Islem Maboud',
    phoneNumber: '0553158471',
    birthDate: new Date('09-04-2000'),
  };

  return (
    <PageContainer>
      <PageHeader header="Profile" subHeader="Edit Info" />
      <HorizontalWrapper>
        <PersonalInfo {...personalInfo} />
        <AccountDetails password="123456798" />
      </HorizontalWrapper>
    </PageContainer>
  );
}

const mapStateToProps = createSelector(
  makeSelectAuthAdmin(),
  authAdmin => ({
    authAdmin,
  }),
);

const mapDispatchToProps = (dispatch: Dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
