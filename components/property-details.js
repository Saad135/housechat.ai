export default function PropertyDetails({ selectedProperty }) {
  return (
    <div hidden={!selectedProperty} className="flex-grow">
      <p>{!selectedProperty ? 'test' : selectedProperty.a}</p>
    </div>
  );
}
