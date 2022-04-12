import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CookieConsent } from './CookieConsent';

export default {
  title: 'CookieConsent',
  component: CookieConsent,
} as ComponentMeta<typeof CookieConsent>;

const Template: ComponentStory<typeof CookieConsent> = () => <CookieConsent />;

export const FirstStory = Template.bind({});