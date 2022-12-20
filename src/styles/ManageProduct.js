import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttons2: {
    alignItems: 'center',
  },
  order: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 25,
    color: 'black',
  },
  inbuttons2: {
    backgroundColor: '#FFBA33',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 40,
  },
  left: {
    textAlign: 'center',
    marginTop: 40,
    bottom: 0,
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    right: 100,
    bottom: 220,
    // backgroundColor: 'grey',
  },
  swipe: {
    fontWeight: '400',
    paddingLeft: 10,
  },
  wrapper1: {
    width: 353,
    marginLeft: -150,
    // backgroundColor:'grey'
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'grey'
    marginTop: 20,
    marginBottom: -15,
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  qtyo: {
    fontWeight: 'bold',
    color: 'white',
  },
  idr: {
    color: '#895537',
  },
  main: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingTop: 20,
    // paddingBottom: 10,
  },
  qty: {
    // padding: ,
    backgroundColor: '#6A4029',
    position: 'absolute',
    right: 10,
    bottom: 45,
    width: 100,
    borderRadius: 14,
  },
});

export default styles;
