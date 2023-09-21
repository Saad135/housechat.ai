export default function PropertyDetails({ selectedProperty }) {
  return (
    <div hidden={!selectedProperty} className="flex-grow">
      <p>{!selectedProperty ? 'test' : selectedProperty.title}</p>
    </div>
  );
}
