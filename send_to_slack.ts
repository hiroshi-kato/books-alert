import { SlackAPI } from 'deno_slack_api';

const SLACK_TOKEN = Deno.env.get('SLACK_TOKEN');
const SLACK_CHANNEL = Deno.env.get('SLACK_CHANNEL');

export const sendToSlack = async (message: string) => {
  if (!SLACK_TOKEN || !SLACK_CHANNEL) return;
  const slackClient = SlackAPI(SLACK_TOKEN);

  try {
    await slackClient.chat.postMessage({
      text: message,
      channel: SLACK_CHANNEL,
    });
  } catch (error) {
    console.log('error', error);
  }
};
