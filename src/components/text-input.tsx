interface Props {
  prompt: string;
  expandArea: boolean;
  setPrompt: (prompt: string) => void;
  setExpandArea: (expand: boolean) => void;
}

export default function TextInput({
  prompt,
  expandArea,
  setExpandArea,
  setPrompt,
}: Props) {
  return (
    <textarea
      name=""
      id=""
      className="flex-1 bg-transparent resize-none outline-none text-wrap border-none min-h-10 px-2 py-4"
      value={prompt}
      placeholder="Message Hilbert"
      onChange={(e) => {
        setPrompt(e.target.value);
        if (e.target.textLength > 120) {
          setExpandArea(true);
        } else {
          setExpandArea(false);
        }
      }}
      rows={expandArea ? 3 : 1}
    ></textarea>
  );
}
