import { StyleSheet } from "react-native";

const style = StyleSheet.create({
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
        alignItems: 'center',
        paddingTop: 100,
        marginBottom: 180,
        marginLeft: 20,
    },

    forgot: {
        color: 'white',
        marginVertical: 10,
        marginLeft: 20
    },

    createBtn: {
        alignItems: 'center',
        backgroundColor: '#FFBA33',
        padding: 22,
        borderRadius: 10,
        justifyContent: 'center',
        zIndex: 1,
        marginHorizontal: 20,
        marginBottom: 17,
        marginTop: 40
    },
    
    textCreate: {
        color: 'black',
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

export default style