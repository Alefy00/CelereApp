/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFDE7',
      },
      scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
      },
      header: {
        paddingVertical: 16,
        backgroundColor: '#FFFDE7',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 16,
        color: COLORS.black,
      },
      memberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 0.5,
      },
      memberInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
      },
      memberName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
      },
      roleContainer: {
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
      },
      memberRole: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
      },
      inviteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 5,
        marginTop: 20,
    
      },
      inviteButtonText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 8,
      },
  });
  
export default styles;