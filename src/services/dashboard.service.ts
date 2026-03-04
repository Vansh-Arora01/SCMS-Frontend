import api from './api';
import { DashboardMetrics, RecentComplaint } from '../types/dashboard.types';

export const dashboardService = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    const response = await api.get<{ metrics: DashboardMetrics }>('/dashboard/metrics');
    return response.data.metrics;
  },

  getRecentComplaints: async (limit: number = 10): Promise<RecentComplaint[]> => {
    const response = await api.get<{ complaints: RecentComplaint[] }>('/complaints/recent', {
      params: { limit },
    });
    return response.data.complaints;
  },
};
