import * as Tooltip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { SmallCrossIcon } from "./Icons";

type RemoveFromListButtonProps = {
  isInTheList?: boolean;
  onRemoveFromList?: () => void;
};

const RemoveFromListButton = ({
  isInTheList,
  onRemoveFromList,
}: RemoveFromListButtonProps) => {
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
              "ml-2 space-x-1.5 overflow-hidden transition-colors [transform:translateZ(0)]"
            )}
            onClick={onRemoveFromList}
            disabled={!isInTheList}
          >
            <span className="relative block h-4 w-4 shrink-0">
              <SmallCrossIcon className="scale-1 absolute inset-0 text-gray-50 hover:text-red-600" />
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
          <p className="text-sm">Remove from the list</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default RemoveFromListButton;
