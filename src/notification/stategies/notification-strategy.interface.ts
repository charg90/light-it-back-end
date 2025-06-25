export interface NotificationStrategy {
  type: string;
  send(to: string, subject: string | undefined, message: string): Promise<void>;
}

export const NOTIFICATION_STRATEGIES = 'NOTIFICATION_STRATEGIES';
