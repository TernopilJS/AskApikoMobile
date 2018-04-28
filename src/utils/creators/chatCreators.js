import uuid from 'uuid/v4';
import { chatConstants } from '../../constants';

export const createMessage = (text, viewerId) => ({
  messageId: uuid(),
  text: text.trim(),
  sender: viewerId,
  timestamp: (new Date()).getTime(),
  state: chatConstants.messageState.sending,
  isNew: true,
});
