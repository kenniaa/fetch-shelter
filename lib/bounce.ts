import nookies from 'nookies';

const EMPTY_PROPS = { props: {} };

const NOT_LOGGED_IN_REDIRECT = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
};

const LOGGED_IN_REDIRECT = {
  redirect: {
    destination: '/',
    permanent: false,
  },
};

export const bounceUnlessLoggedIn = (ctx) => {
  const { isLoggedIn: sessionToken } = nookies.get(ctx);

  if (!sessionToken) {
    console.error('No token found-- redirecting');
    return NOT_LOGGED_IN_REDIRECT;
  }

  console.info('Token found', sessionToken);
  return EMPTY_PROPS;
};

export const bounceUnlessLoggedOut = (ctx) => {
  const { isLoggedIn: sessionToken } = nookies.get(ctx);

  if (sessionToken) {
    console.error('Token found-- redirecting', sessionToken);
    return LOGGED_IN_REDIRECT;
  }

  console.info('Token not found');
  return EMPTY_PROPS;
};
