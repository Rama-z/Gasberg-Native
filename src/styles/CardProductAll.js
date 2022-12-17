import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    position: 'relative',
    backgroundColor: 'bisque',
    width: 150,
    height: 240,
    shadowColor: '#3939391A',
    elevation: 1,
    borderRadius: 30,
    marginHorizontal: 8.5,
  },
  imageCard: {
    width: 120,
    height: 130,
    borderRadius: 20,
  },
  containerImage: {
    position: 'relative',
    left: 15,
    top: -35,
  },
  containerPromo: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 10,
    top: 20,
    borderRadius: 20,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    // fontFamily: "Poppins-Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    width: '100%',
    lineHeight: 22.29,
  },
  cardPrice: {
    // fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: 50,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  cardPrice2: {
    fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: 70,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#6A4029',
  },
  textPromo: {
    fontFamily: 'Poppins-Reguler',
    color: 'black',
    fontWeight: '700',
    fontSize: 30,
  },
});

export default styles;
