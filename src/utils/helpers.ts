import { format, formatDistanceToNow } from 'date-fns';
import { ComplaintStatus, ComplaintPriority } from '../types/complaint.types';
import { COMPLAINT_STATUSES, COMPLAINT_PRIORITIES } from './constants';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const getStatusBadgeClass = (status: ComplaintStatus): string => {
  return COMPLAINT_STATUSES[status]?.color || 'bg-gray-100 text-gray-800';
};

export const getPriorityBadgeClass = (priority: ComplaintPriority): string => {
  return COMPLAINT_PRIORITIES[priority]?.color || 'bg-gray-100 text-gray-800';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const calculateSLAStatus = (deadline: string): 'safe' | 'warning' | 'critical' => {
  const now = new Date();
  const slaDate = new Date(deadline);
  const hoursRemaining = (slaDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursRemaining > 24) return 'safe';
  if (hoursRemaining > 6) return 'warning';
  return 'critical';
};
