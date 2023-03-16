import { connect } from 'react-redux'
import AccountView from './AccountView'

const mapStateToProps = (state) => {
    return {
        account_info: state.main.account_info
    };
  };

export default connect(mapStateToProps)(AccountView)