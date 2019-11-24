import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {CallButton} from '../buttons/CallButton';
import SubmitButton from '../buttons/SubmitButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class DriverNavigationFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={
        styles.BottomHorizontalRow
      }>
        <View style={{marginHorizontal:10}}>
          <CallButton
            color={this.props.color}
            onPress = {this.props.callEvent}
          />
        </View>
        <View>

          {/*<Text style={styles.title}>*/}
          <TouchableOpacity
            onPress={this.props.startEvent}
          >
            <View  style={{alignSelf:'center',alignItems:'center'}}>
              <Ionicons
                name="md-navigate"
                size={30}
              />

              <Text
                style={{alignSelf:'center', color: 'grey'}}>
                Start
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal:10}}>
          <SubmitButton
            color = '#FF6969'
            submitEvent = {this.props.submitEvent}
            orderValue={this.props.orderValue}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BottomHorizontalRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: '5%',
    marginTop: '3%',
  },
  title:{ // same as shareButton's title style
    color: '#515C6F',
    fontSize: 26,
    fontWeight:'bold',
    textAlign: 'center',
  },
});
