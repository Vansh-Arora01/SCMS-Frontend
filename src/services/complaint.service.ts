import api from "./api";
import { Complaint, CreateComplaintPayload } from "../types/complaint.types";

export const useComplaintService = () => {

  const getMyComplaints = async (): Promise<Complaint[]> => {
    const res = await api.get("/complain");
    return res.data.data.complaints;
  };

  const getVoteableComplaints = async (): Promise<Complaint[]> => {
    const res = await api.get("/complain/voteable");
    return res.data.data;
  };

  const createComplaint = async (
    payload: CreateComplaintPayload
  ): Promise<Complaint> => {
    const res = await api.post("/complain/create", payload);
    return res.data.data; // ✅ CORRECT
  };

  const vote = async (id: string): Promise<void> => {
    await api.post(`/complain/vote/${id}/vote`);
  };

  const unvote = async (id: string): Promise<void> => {
    await api.delete(`/complain/vote/${id}/vote`);
  };

  const getStatus = async (id: string): Promise<Complaint> => {
    const res = await api.get(`/complain/status/${id}`);
    return res.data.data;
  };

  return {
    getMyComplaints,
    getVoteableComplaints,
    createComplaint,
    vote,
    unvote,
    getStatus,
  };
};