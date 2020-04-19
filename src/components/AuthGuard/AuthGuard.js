import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';

// Example of user roles: ['GUEST', 'USER', 'ADMIN'];

const AuthGuard = props => {
  const { roles, children } = props;

  const session = useSelector(state => state.session);
  const router = useRouter();

  useEffect(() => {
    if (!session.loggedIn || !session.sessionToken) {
      router.history.push('/auth/login');
      return;
    }

    if (!isEmpty(roles) && !roles.includes(session.loggedUser.role)) {
      router.history.push('/errors/error-401');
    }
  }, [router, session, roles]);

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
