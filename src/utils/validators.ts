export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
};

export const validateRequired = (value: string, fieldName: string): string | undefined => {
  return value.trim() ? undefined : `${fieldName} is required`;
};

export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): string | undefined => {
  return value.length >= minLength
    ? undefined
    : `${fieldName} must be at least ${minLength} characters`;
};

export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string
): string | undefined => {
  return value.length <= maxLength
    ? undefined
    : `${fieldName} must not exceed ${maxLength} characters`;
};
