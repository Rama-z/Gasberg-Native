import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyles: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cupimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttons2: {
    alignItems: 'center',
  },
  formPrice: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6A4029',
    fontSize: 24,
    borderBottomWidth: 1,
  },
  formName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    borderBottomWidth: 1,
  },
  inbuttons2: {
    backgroundColor: '#6A4029',
    width: 350,
    height: 50,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 14,
    marginTop: 40,
  },
  deliv: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingTop: 20,
  },
  only: {
    // fontWeight: 'bold',
    color: 'grey',
    fontSize: 15,
  },
  desc2: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    paddingTop: 20,
  },
  desc3: {
    color: 'grey',
    fontSize: 15,
    borderBottomWidth: 1,
  },
  prod: {
    alignItems: 'center',
    paddingTop: 20,
  },
  priceWrap: {
    alignItems: 'center',
    paddingTop: 10,
  },
  cupWrap: {
    alignItems: 'center',
    paddingTop: 20,
  },
  main: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  priceTag: {
    fontWeight: 'bold',
    color: '#6A4029',
    fontSize: 24,
    // backgroundColor: 'grey'
  },
  container: {
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  red: {
    // backgroundColor: 'red',
    flex: 3,
    height: 50,
    padding: 20,
  },
  sect: {
    // backgroundColor: 'yellow',
    flex: 1,
    height: 50,
    paddingTop: 20,
  },
  dotdot: {
    alignItems: 'center',
    paddingTop: 30,
  },
});

export default styles;
