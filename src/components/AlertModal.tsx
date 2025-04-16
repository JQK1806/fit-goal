import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { globalStyles, colors, spacing } from '../styles/globalStyles';

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  showConfirmButton?: boolean;
  confirmText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  showConfirmButton = false,
  confirmText = 'OK'
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            {showConfirmButton && (
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>{confirmText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as ViewStyle,
  modalView: {
    margin: spacing.lg,
    backgroundColor: colors.background.primary,
    borderRadius: 10,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  } as ViewStyle,
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    marginBottom: spacing.md,
    textAlign: 'center',
    color: colors.text.primary,
  } as TextStyle,
  modalText: {
    marginBottom: spacing.lg,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text.secondary,
  } as TextStyle,
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  } as ViewStyle,
  button: {
    borderRadius: 8,
    padding: spacing.md,
    elevation: 2,
    marginHorizontal: spacing.xs,
    minWidth: 100,
  } as ViewStyle,
  confirmButton: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  cancelButton: {
    backgroundColor: '#757575',
  } as ViewStyle,
  buttonText: {
    color: colors.text.light,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    textAlign: 'center',
  } as TextStyle,
});

export default AlertModal; 