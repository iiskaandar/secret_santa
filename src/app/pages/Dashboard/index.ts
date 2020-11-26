import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import Dashboard from './components/Dashboard.component'

export default compose(
  injectIntl,
)(Dashboard);
