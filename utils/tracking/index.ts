import mixpanel, { Dict, Query } from "mixpanel-browser";

const isProd = process.env.NODE_ENV === "production";

mixpanel.init(process.env.MIXPANEL_TOKEN, {
  // Use your project's URL, adding a slug for all Mixpanel requests
  api_host: `${process.env.VERCEL_URL}/mp`,
});

export const Mixpanel = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
  track_links: (query: Query, name: string) => {
    mixpanel.track_links(query, name, {
      referrer: document.referrer,
    });
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    },
  },
};
