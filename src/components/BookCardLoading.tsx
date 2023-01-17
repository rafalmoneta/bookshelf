import { twMerge } from "tailwind-merge";

const BookCardLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-4 rounded border-2 border-gray-800 p-6 py-4">
        <div className="relative h-[212px] w-[100px] rounded bg-gray-200 dark:bg-gray-700 md:w-[140px]"></div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <div className="h-[28px] rounded bg-primary"></div>
              <div className="mt-2 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-8 h-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-1 mt-4 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCardLoading;
