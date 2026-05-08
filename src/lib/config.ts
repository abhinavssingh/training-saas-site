import { config } from '@optimizely/cms-sdk';

/**
config() Parameters
apiKey (required): Your Optimizely Graph API key (Single key from CMS Settings → API Keys)
graphUrl (optional): Custom Graph URL. Defaults to https://cg.optimizely.com/content/v2
host (optional): Default application host for path filtering. Useful for multi-site scenarios
maxFragmentThreshold (optional): Maximum number of GraphQL fragments before logging warnings. Defaults to 100
cache (optional): Enable/disable server-side caching for all queries. Defaults to true
slot (optional): Select which Graph index to query ('Current' or 'New'). Used during smooth rebuilds
*/
config({
  apiKey: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
});
