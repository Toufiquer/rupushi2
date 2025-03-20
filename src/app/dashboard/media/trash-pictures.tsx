import DemoTable from '../table/table';

const TrashPictures = () => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold mb-4">
        <DemoTable viewTotalCount={true} />
      </h2>
    </div>
  );
};

export default TrashPictures;
