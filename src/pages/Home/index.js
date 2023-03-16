import { connect } from 'react-redux'
import HomeView from './HomeView'

const mapStateToProps = (state) => {
    return {
        account_info: state.main.account_info
    };
  };

export default connect(mapStateToProps)(HomeView)