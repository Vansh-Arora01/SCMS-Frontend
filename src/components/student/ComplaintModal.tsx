import { useState } from "react";
import { useComplaintService } from "../../services/complaint.service";
import {
  CreateComplaintPayload,
  ComplaintCategory,
} from "../../types/complaint.types";

interface Props {
  setOpenModal: (val: boolean) => void;
}

export default function ComplaintModal({ setOpenModal }: Props) {
  const { createComplaint } = useComplaintService();

  const [form, setForm] = useState<CreateComplaintPayload>({
    title: "",
    description: "",
    category: "INFRASTRUCTURE",
    isAnonymous: false,
    eligibleforVote: false,
  });

  const handleSubmit = async () => {
    await createComplaint(form);
    setOpenModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white p-5 md:p-6 rounded-2xl w-full max-w-md md:max-w-lg shadow-xl">

        <h2 className="text-lg md:text-xl font-bold mb-4">
          Create Complaint
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 mb-3 rounded"
          placeholder="Description"
          rows={4}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value as ComplaintCategory,
            })
          }
        >
          <option value="INFRASTRUCTURE">Infrastructure</option>
          <option value="HOSTEL">Hostel</option>
          <option value="ACADEMIC">Academic</option>
          <option value="OTHER">Other</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded"
        >
          Submit
        </button>

      </div>
    </div>
  );
}