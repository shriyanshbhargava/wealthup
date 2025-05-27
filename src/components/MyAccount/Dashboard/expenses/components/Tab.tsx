export const Tab: React.FC<{
  title: string;
  selected: boolean;
  onClick: () => void;
}> = ({ title, selected, onClick }) => {
  return (
    <div
      className={`cursor-pointer ${
        selected ? "border-b-4 border-[#00c9a7]" : ""
      }`}
      onClick={onClick}
    >
      <p className="text-2xl font-robo font-bold text-white mb-1">{title}</p>
    </div>
  );
};
