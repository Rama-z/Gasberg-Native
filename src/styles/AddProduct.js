import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  all_container: {
    marginLeft: '10%',
    width: '80%',
    marginTop: '20%',
  },
  container_up: {
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: `#BCBABA`,
    borderWidth: 0,
    fontFamily: 'Poppins',
    fontSize: 10,
    height: 40,
    margin: 12,
    outlineWidth: 4,
    padding: 10,
    width: `80%`,
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
  },
  input_bottom: {
    borderBottomWidth: 1,
    borderColor: `#BCBABA`,
    borderWidth: 0,
    fontFamily: 'Poppins',
    fontSize: 14,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    outlineWidth: 4,
    padding: 10,
    width: `90%`,
    color: 'black',
    fontWeight: '400',
  },
  text: {
    color: `black`,
    fontFamily: `Poppins`,
    fontSize: 17,
    fontWeight: '900',
  },
  image: {
    borderRadius: 200,
    width: 150,
    height: 150,
    marginTop: 10,
  },
});

export default styles;
