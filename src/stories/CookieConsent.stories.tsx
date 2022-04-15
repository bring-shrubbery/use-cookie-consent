import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CookieConsent } from './CookieConsent';

export default {
  title: 'CookieConsent',
  component: CookieConsent,
} as ComponentMeta<typeof CookieConsent>;

const Template: ComponentStory<typeof CookieConsent> = (args) => (
  <CookieConsent {...args} />
);

export const CookieDefaultStory = Template.bind({});
export const LocalStorage = Template.bind({});
export const SessionStorage = Template.bind({});
CookieDefaultStory.args = {};
LocalStorage.args = { local: 'local' };
SessionStorage.args = { session: 'session' };
