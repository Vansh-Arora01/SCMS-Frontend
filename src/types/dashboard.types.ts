export interface DashboardMetrics {
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  avgResolutionTime: number;
  complaintsThisMonth: number;
  monthlyGrowth: number;
  priorityBreakdown: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  statusBreakdown: {
    pending: number;
    assigned: number;
    in_progress: number;
    resolved: number;
    closed: number;
  };
  departmentBreakdown: Array<{
    department: string;
    count: number;
  }>;
  trendData: Array<{
    date: string;
    complaints: number;
    resolved: number;
  }>;
}

export interface RecentComplaint {
  id: string;
  title: string;
  status: string;
  priority: string;
  department: string;
  createdAt: string;
  userName: string;
}
