import * as React from 'react';
import PageContainer from 'components/pageContainer';
import PageHeader from 'components/pageHeader';
import { HorizontalWrapper } from 'components/horizontalWrapper';
import PersonalInfo from './personalInfo';
import { IPersonalInfo } from './type';
import AccountDetails from './accountDetails';

export default function ProfilePage() {
  const fakePersonalInfo: IPersonalInfo = {
    username: 'islempenywis',
    email: 'islempenywis@gmail.com',
    fullName: 'Islem Maboud',
    phoneNumber: '0553158471',
    birthDate: new Date('09-04-2000'),
  };

  return (
    <PageContainer>
      <PageHeader header="Profile" subHeader="Edit Info" />
      <HorizontalWrapper>
        <PersonalInfo {...fakePersonalInfo} />
        <AccountDetails password="*********" />
      </HorizontalWrapper>
    </PageContainer>
  );
}
