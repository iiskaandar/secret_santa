import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import MainChart from './components/MainChart.component'

export default compose(
  injectIntl,
)(MainChart);
