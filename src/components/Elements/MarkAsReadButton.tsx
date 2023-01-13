import * as Tooltip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { SmallCheckIcon } from "./Icons";

type MarkAsReadButtonProps = {
  isInTheList: boolean;
  isRead: boolean;
  onMarkAsRead: () => void;
  onUnMarkAsRead: () => void;
};

const MarkAsReadButton = ({
  isInTheList,
  isRead,
  onMarkAsRead,
  onUnMarkAsRead,
}: MarkAsReadButtonProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger
          asChild
          onClick={(event) => event.preventDefault()}
          onMouseDown={(event) => event.preventDefault()}
        >
          <Button
            variant="secondary"
            className={twMerge(
              "ml-2 space-x-1.5 overflow-hidden transition-colors [transform:translateZ(0)]",
              isRead && "border-green-600 bg-green-900"
            )}
            onClick={!isRead ? onMarkAsRead : onUnMarkAsRead}
            disabled={!isInTheList}
          >
            <span className="relative block h-4 w-4 shrink-0">
              {isRead ? (
                <span>
                  <SmallCheckIcon className="scale-1 absolute inset-0 text-gray-50 hover:text-green-600" />
                </span>
              ) : (
                <span>
                  <SmallCheckIcon className="scale-1 absolute inset-0 text-gray-50 hover:text-green-600" />
                </span>
              )}
            </span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          sideOffset={4}
          className={twMerge(
            "max-w-[260px] rounded px-3 py-1.5 shadow-lg sm:max-w-sm"
          )}
        >
          <p className="text-sm">
            {!isRead ? "Mark as read" : "Mark as unread"}
          </p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MarkAsReadButton;
