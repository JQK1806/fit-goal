import { StyleSheet, TextStyle } from 'react-native';

// Common colors
export const colors = {
  primary: '#4a90e2',
  primaryLight: '#7ab0e8',
  secondary: '#2e7d32',
  text: {
    primary: '#333',
    secondary: '#666',
    light: '#fff',
  },
  background: {
    primary: '#fff',
    secondary: '#f5f5f5',
    input: '#f9f9f9',
    card: '#f9f9f9',
  },
  border: '#ddd',
  error: '#d32f2f',
  success: '#2e7d32',
  accent: '#ff9800',
};

// Common spacing
export const spacing = {
  xs: 5,
  sm: 8,
  md: 15,
  lg: 20,
  xl: 30,
};

// Common typography
export const typography = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as TextStyle['fontWeight'],
  },
  subtitle: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
  button: {
    fontSize: 18,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  body: {
    fontSize: 16,
  },
};

// Common styles
export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  cardText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
  
  // Form styles
  formContainer: {
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    backgroundColor: colors.background.input,
  },
  
  // Button styles
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryLight,
  },
  buttonText: {
    color: colors.text.light,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
  
  // Text styles
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.subtitle.fontSize,
    color: colors.text.secondary,
  },
  label: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  
  // Header styles
  headerContainer: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: spacing.xl,
  },
  
  // Link styles
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  linkText: {
    fontSize: typography.body.fontSize,
    color: colors.text.secondary,
  },
  link: {
    fontSize: typography.body.fontSize,
    color: colors.primary,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  
  // Alert styles
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.body.fontSize,
  },
  successContainer: {
    backgroundColor: '#e8f5e9',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.success,
  },
  successText: {
    color: colors.success,
    fontSize: typography.body.fontSize,
  },
}); 