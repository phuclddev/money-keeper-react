import { connect } from 'react-redux'
import AccountAddView from './AccountAddView'

const mapStateToProps = (state) => {
    return {
        account_info: state.main.account_info
    };
  };

export default connect(mapStateToProps)(AccountAddView)