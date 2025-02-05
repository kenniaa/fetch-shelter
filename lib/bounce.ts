import nookies from 'nookies'

const EMPTY_PROPS = { props: {} };
const REDIRECT_PROPS = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
}

const createSessionBounder = () => {
  return function (ctx) {
    const {'AWSALB': sessionToken} = nookies.get(ctx);

    if (!sessionToken) {
      console.error('No token found-- redirecting');
      return REDIRECT_PROPS;
    }

    console.info('Token found', sessionToken);
    return EMPTY_PROPS;
  };
};

export const bounceUnlessLoggedIn = createSessionBounder();
