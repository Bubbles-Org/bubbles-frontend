import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import theme from './theme';
import store from './store';
import routes from './routes';
import { ScrollReset } from './components';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './assets/scss/index.scss';
import CustomNotificationStack from './components/customNotificationStack/CustomNotificationStack';

const history = createBrowserHistory();

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <>
            <Router history={history}>
              <ScrollReset />
              {renderRoutes(routes)}
            </Router>
            <CustomNotificationStack maxSnack={3} />
          </>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
