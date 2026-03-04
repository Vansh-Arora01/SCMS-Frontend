import api from './api';
import { Notification } from '../types/notification.types';

export const notificationService = {
  // GET /notifications
  getNotifications: async (): Promise<Notification[]> => {
    const res = await api.get<{
      success: boolean;
      data: { notifications: Notification[] };
    }>('/notifications');

    return res.data.data.notifications;
  },

  // PATCH /notifications/:id/read
  markAsRead: async (notificationId: string): Promise<void> => {
    await api.patch(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
  await api.patch('/notifications/read-all');
},
  // GET /notifications/unread-count
  getUnreadCount: async (): Promise<number> => {
    const res = await api.get<{
      success: boolean;
      data: { count: number };
    }>('/notifications/unread-count');

    return res.data.data.count;
  },
};


