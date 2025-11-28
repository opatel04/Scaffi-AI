import { Button } from "./ui/button";
import { FileText } from "lucide-react";

interface FileSelectorProps {
  files: string[];
  currentFile: string;
  onFileSelect: (filename: string) => void;
  fileHasChanges?: (filename: string) => boolean;
}

export function FileSelector({
  files,
  currentFile,
  onFileSelect,
  fileHasChanges
}: FileSelectorProps) {
  return (
    <div className="mb-8 border-b border-gray-200/60 dark:border-gray-800/60 pb-4">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Files
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {files.map((filename) => {
          const isSelected = filename === currentFile;
          const hasChanges = fileHasChanges?.(filename);

          return (
            <Button
              key={filename}
              onClick={() => onFileSelect(filename)}
              variant={isSelected ? "default" : "outline"}
              size="default"
              className={`
                relative px-5 py-2
                ${isSelected
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                  : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                }
              `}
            >
              <span className="font-mono text-sm font-semibold">{filename}</span>
              {hasChanges && !isSelected && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
