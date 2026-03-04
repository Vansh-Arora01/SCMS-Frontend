const StatusBadge = ({ status }: { status: string }) => {

  const colors: any = {
    PENDING: "bg-yellow-500",
    IN_PROGRESS: "bg-blue-500",
    RESOLVED: "bg-green-500",
    REJECTED: "bg-red-500"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
