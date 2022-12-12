import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bg: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        zIndex: 1,
        // opacity: 0.6,
    },
    
    content: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    title: {
        color: 'white',
        fontSize: 65,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 100,
        marginBottom: 150,
    },
    
    createBtn: {
        alignItems: 'center',
        backgroundColor: '#6A4029',
        padding: 22,
        borderRadius: 10,
        justifyContent: 'center',
        zIndex: 1,
        marginHorizontal: 20,
        marginBottom: 17,
        marginTop: 40
    },
    
    textCreate: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },

    googleContainer: {
        flexDirection: 'row'
    },
    
    googleBtn: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 10,
        justifyContent: 'center',
        zIndex: 1,
        marginHorizontal: 20,
        marginBottom: 17,
    },

    textGoogle: {
        color: 'black',
        fontSize: 17,
        paddingLeft: 12
    },
})

export default styles