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

//TODO storage stories

export const DefaultStory = Template.bind({});
export const LocalStorage: ComponentStory<typeof CookieConsent> = () => (
  <CookieConsent />
);
DefaultStory.args = {};
