import { Typography, Chip, Tooltip, IconButton } from "@material-tailwind/react";
import { Edit, EditPencil } from "iconoir-react";

const ApplicationRow = ({ data }) => {
    const {
      jobTitle,
      companyName,
      statusLabel,
      appliedAt,
    } = data;

    return (
      <tr className="border-b border-surface last:border-0">
        <td className="p-3">
          <Typography type="small">{jobTitle}</Typography>
        </td>
        <td className="p-3">
          <Typography type="small">{companyName}</Typography>
        </td>
        <td className="p-3">
          <Chip size="sm" color="secondary">
            <Chip.Label>{statusLabel}</Chip.Label>
          </Chip>
        </td>
        <td className="p-3">
          <Typography type="small">
            {new Date(appliedAt).toLocaleDateString()}
          </Typography>
        </td>
        <td className="p-3">
          <Tooltip>
            <Tooltip.Trigger
              as={IconButton}
              variant="ghost"
              color="secondary"
            >
              <Edit className="h-4 w-4 text-black dark:text-white" />
            </Tooltip.Trigger>
              <Tooltip.Content>
                Edit Application
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip>
        </td>
      </tr>
    );
};

export default ApplicationRow;