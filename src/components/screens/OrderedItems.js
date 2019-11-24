import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  // Share,
  Platform,
  StatusBar,
  BackHandler, NetInfo,
} from 'react-native';
import call from 'react-native-phone-call';
import {HeaderOrderedItems} from './../views/HeaderOrderedItems';
import { OrderedItemsBody } from './../views/OrderedItemsBody';
import { OrderedItemsFooter } from './../views/OrderedItemsFooter';
import { connect } from 'react-redux';
import {
  getOrderDetailById,
  paymentStatusUpdate,
  driverStatus,
  blockUser,
} from './../../stores/actions';




// eslint-disable-next-line react/prefer-stateless-function


let totalPrice = null;


const customerName ='TestCustomer';


let items = [];
let allItems ='';
let totalAndFooter='';


// Create a new PDF in your app's private Documents directory
class OrderedItems extends Component {

  constructor(props) {
    super(props);
    // props

    this.state = {
      ShareButtonColor:'grey',
      UnpaidIconColor:'red',
      CardIconColor:'grey',
      CashIconColor:'grey',
      call_Client_Color:'#008AF3',
      check_out_Color:'#008AF3',
      paymentStatus: 'paid',
      orderData: '',
      orderDetails: '',
      imageBaseUrl: 'https://soft-box.s3.us-east-2.amazonaws.com/foodItem/',
      // curTime:null,
    };
  }

  static navigationOptions = {
    header: null,

  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => true
  // handleBackButtonClick = () => false
  // Returning true from onBackButtonPressAndroid denotes that we have
  // handled the event, and react-navigation's listener will not get called,' +
  // ' thus not popping the screen. Returning false will cause the event to ' +
  // 'bubble up and react-navigation's listener will pop the screen.


  componentDidMount() {
    const { navigation } = this.props;
    const orderData = navigation.getParam('orderData', '1');
    totalPrice = orderData.totalPrice;
    this.props.getOrderDetailById(orderData.id)
      .then(response => {
        items = this.props.order;
        this.setState({
          orderDetails: this.props.order,
        });
      });
    this.setState({orderData});
    // http://18.223.117.205:8080/api/order-masters/9852
  }

  _onPressButtonTouch_APP=()=>{
    this.setState({
      UnpaidIconColor: 'red',
      CardIconColor: 'grey',
      CashIconColor: 'grey',
      paymentStatus: 'unpaid',
    });

  };
  _onPressButtonCard=()=>{
    this.setState({
      UnpaidIconColor:'grey',
      CardIconColor:'blue',
      CashIconColor:'grey',
      paymentStatus: 'paid',
    });
  };
  _onPressButtonCash=()=>{
    this.setState({
      UnpaidIconColor:'grey',
      CardIconColor:'grey',
      CashIconColor:'blue',
      paymentStatus: 'paid',
    });
  };
  _onPressButtonCall_Client=()=>{
    this.setState({
      call_Client_Color:'blue',
    });
    // Linking.openURL(`tel:${+8801614303606}`);
    let args = {
      number: this.state.orderData.mobileNo, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch(console.error);
  };
  _onPressButtonCheck_Out=()=>{
    // no need
    this.props.paymentStatusUpdate(this.state.orderData.id, this.state.paymentStatus);
    this.props.driverStatus(this.state.orderData.id, '4');
    this.setState({
      check_out_Color:'blue',
    });



    return this.props.navigation.navigate('OrderList');



    // for safe keeping might be needed for future still on test.
    /*
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
        NavigationActions.navigate({ routeName: 'OrderList' }),
      ],
    });

    this.props.navigation.dispatch(resetAction);
*/

  };
  componentDidUpdate(prevProps, prevState, snapshot){
    // commented today for logout test.
    if ((this.props.order!== prevProps.order)) {
      //this.props.navigation.navigate('OrderList');
    }
  }

  render() {
    const { navigation } = this.props;

    const HomeCards = [];
    const id = navigation.getParam('orderId', '1');
    return (

      <View style={styles.container}>
        <StatusBar backgroundColor={'#FFFFFF'} barStyle='dark-content'/>
        {/*<KeyboardAwareScrollView>*/}

        <HeaderOrderedItems
          totalPrice={this.state.orderData.totalPrice}
        />

        {/*</KeyboardAwareScrollView>*/}
        {/*start of action buttons*/}

        <OrderedItemsBody
          items={this.state.orderDetails}
          unpaidButtonColor={this.state.UnpaidIconColor}
          cashButtonColor={this.state.CashIconColor}
          cardButtonColor={this.state.CardIconColor}
          unpaidButtonPress={this._onPressButtonTouch_APP}
          cardButtonPress={this._onPressButtonCard}
          cashButtonPress={this._onPressButtonCash}
        />


        <OrderedItemsFooter
          callButtonColor={this.state.call_Client_Color}
          checkOutButtonColor={this.state.check_out_Color}
          callButtonPress={this._onPressButtonCall_Client}
          checkoutButtonPress={this._onPressButtonCheck_Out}

        />

      </View>
    );
    // }

  }

}


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',
    // backgroundColor:'cornsilk',
    flex: 1,
  },
});


const mapStateToProps = state =>
  //maps state of redux to component props
  ({
    order:state.orderList.orderData,
    errorStatus: state.orderList.errorMsg,
  })
;

export default connect(mapStateToProps,
  {getOrderDetailById, paymentStatusUpdate, driverStatus, blockUser}
)(OrderedItems);
// export default connect(this.state,

// export default LoginScreen;
