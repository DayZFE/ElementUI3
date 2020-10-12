export interface NotificationConfig {
  offset: number;
  duration: number;
}

export type NotificationConfigOptions = Partial<NotificationConfig>;

export type NotificationType = 'success' | 'info' | 'warning' | 'error' | '';
export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface NotificationData {
  notificationId?: string;
  title?: string;
  message?: string;
  type?: NotificationType;
  showClose?: boolean;
  position?: NotificationPosition;
  customClass?: string;
  duration?: number;
  onClick?: (() => void) | null;
  onClose?: (() => void) | null;
}

export const positionClassTag = {
  'top-left': 'tl',
  'top-right': 'tr',
  'bottom-left': 'bl',
  'bottom-right': 'br',
}

export const notificationProps = {
  notificationId: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => NotificationType,
    default: '',
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as () => NotificationPosition,
    default: 'top-right',
  },
  duration: {
    type: Number,
    default: 4500,
  },
  onClick: {
    type: Function as () => Function | null,
    default: null,
  },
  onClose: { 
    type: Function as () => Function | null,
    default: null
  },
  customClass: String,
};
