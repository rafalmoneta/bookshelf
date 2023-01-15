import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { HeartFilledIcon, HeartIcon } from "./Icons";

type LikeButtonProps = {
  isLiked?: boolean;
  onLike?: () => void;
  onUnlike?: () => void;
};

const LikeButton = ({
  onLike = () => {},
  onUnlike = () => {},
  isLiked = false,
}: LikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLikeClick = () => {
    if (isAnimating) return;

    if (isLiked) {
      onUnlike();
    } else {
      setIsAnimating(true);
      onLike();
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

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
              "space-x-1.5 overflow-hidden transition-colors [transform:translateZ(0)]",
              isLiked &&
                "border-red-300 !bg-red-100 dark:border-red-700 dark:!bg-red-900",
              isAnimating && "!border-red-600 !bg-red-600 dark:!bg-red-600"
            )}
            onClick={handleLikeClick}
            disabled={isAnimating}
          >
            <span className="relative block h-4 w-4 shrink-0">
              {isLiked && !isAnimating ? (
                <HeartFilledIcon className="scale-1 absolute inset-0 text-gray-50" />
              ) : (
                <>
                  <HeartIcon
                    className={twMerge(
                      "absolute inset-0 transform-gpu fill-transparent text-red-500 transition-all",
                      isAnimating && "!scale-[12] !fill-red-600"
                    )}
                  />
                  <span
                    className={twMerge(
                      "ring-6 absolute top-0 left-[-.5px] z-10 h-4 w-4 transform-gpu rounded-full ring-inset ring-gray-50 transition-all duration-300",
                      isAnimating ? "scale-150 !ring-0" : "scale-0"
                    )}
                  ></span>
                  <HeartFilledIcon
                    className={twMerge(
                      "ease-spring absolute inset-0 z-10 transform-gpu text-gray-50 transition-transform delay-200 duration-300",
                      isAnimating ? "scale-1" : "scale-0"
                    )}
                  />
                </>
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
          <p className="text-sm">{!isLiked ? "Like!" : "Unlike :("}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default LikeButton;
