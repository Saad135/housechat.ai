import Image from 'next/image';

export default function Home() {
  const testArray = [1, 2, 3, 4];
  return (
    <div className="h-screen flex flex-row w-screen">
      {/* <p className="">Hi</p> */}
      <div className="h-[90%] w-4/5">
        <iframe
          src="https://abidlabs-pytorch-image-classifier.hf.space"
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="w-1/5">
        {testArray.map((element) => (
          <p key={element}>Testing</p>
        ))}
      </div>
    </div>
  );
}
