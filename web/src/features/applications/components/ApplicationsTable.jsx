import ApplicationRow from "./ApplicationRow";

const TABLE_HEAD = ["Position", "Company", "Status", "Applied at", ""];

const ApplicationsTable = ({ rows }) => {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-lg border border-surface">
      <table className="w-full">
        <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="px-2.5 py-2 text-start font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="group text-sm text-black dark:text-white">
          {rows && rows.length > 0 ? (
            rows.map((row) => <ApplicationRow key={row.id} data={row} />)
          ) : (
            <tr>
              <td
                colSpan={TABLE_HEAD.length}
                className="p-4 text-center text-gray-500"
              >
                No applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;