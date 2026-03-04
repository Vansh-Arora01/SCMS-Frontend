export type ComplaintStatus =
  | "OPEN"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED"
  | "ESCALATED";

export type ComplaintPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type ComplaintCategory =
  | "INFRASTRUCTURE"
  | "HOSTEL"
  | "ACADEMIC"
  | "OTHER";

export interface Attachment {
  url: string;
  fileType: "IMAGE" | "PDF" | "OTHER";
  uploadedAt: string;
}

export interface Complaint {
  _id: string;
  complaintNumber: string;

  title: string;
  description: string;
  category: ComplaintCategory;

  status: ComplaintStatus;

  assignedTo: string | null;
  assignedAt?: string;

  priorityScore: number;
  priority: ComplaintPriority;

  isAnonymous: boolean;
  createdBy: string | null;

  collegeId: string;

  voteCount: number;
  eligibleforVote: boolean;

  

  reassignmentRequested: boolean;
  reassignmentReason?: string;

  resolutionNote?: string;
  hasVoted?: boolean; 

  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
}
export interface CreateComplaintPayload {
  title: string;
  description: string;
  category: ComplaintCategory;
  isAnonymous?: boolean;
  eligibleforVote?: boolean;
  attachment?: File[];
}