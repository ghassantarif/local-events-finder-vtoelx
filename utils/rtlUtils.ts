
import { I18nManager } from 'react-native';

export const isRTL = () => {
  return I18nManager.isRTL;
};

export const forceRTL = (enable: boolean) => {
  I18nManager.forceRTL(enable);
};

export const allowRTL = (allow: boolean) => {
  I18nManager.allowRTL(allow);
};

// Helper function to get appropriate flex direction based on RTL
export const getFlexDirection = (isRTL: boolean, defaultDirection: 'row' | 'column' = 'row') => {
  if (defaultDirection === 'column') return 'column';
  return isRTL ? 'row-reverse' : 'row';
};

// Helper function to get appropriate text alignment
export const getTextAlign = (isRTL: boolean, defaultAlign: 'left' | 'center' | 'right' = 'left') => {
  if (defaultAlign === 'center') return 'center';
  return isRTL ? 'right' : 'left';
};

// Helper function to get appropriate margin/padding properties
export const getMarginStart = (value: number) => ({ marginStart: value });
export const getMarginEnd = (value: number) => ({ marginEnd: value });
export const getPaddingStart = (value: number) => ({ paddingStart: value });
export const getPaddingEnd = (value: number) => ({ paddingEnd: value });
