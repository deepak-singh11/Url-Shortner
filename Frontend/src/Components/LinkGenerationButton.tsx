
export default function LinkGenerationButton() {
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center text-center bg-white px-4 border ">
      <div className="max-w-4xl">
        {/* Image and Card */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Link-Generation-Logo.png" // replace this with your own relevant image or keep f0fe6d5e... image name
            alt="Short Link Illustration"
            className="w-[280px] md:w-[480px] mb-6"
          />
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Connect your audience with a simple click
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg mb-6">
          Create a Short Link for any link. Then edit, customize, and track your Short Link here.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm">
            Create a Short Link
          </button>
          <a href="#" className="text-blue-600 hover:underline text-sm">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
