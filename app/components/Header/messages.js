/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  input: {
    id: `${scope}.input`,
    defaultMessage: 'Input String',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'View All',
  },
});
