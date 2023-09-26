import ChatSVG from './ui/chat-svg';
import ListSVG from './ui/list-svg';

export default function TopBar({ params }) {
  return (
    <div className="p-4 bg-blue-600 text-gray-100 text-center text-3xl font-bold tracking-wide">
      <div className="flex justify-between sm:block items-baseline px-2">
        <div className="h-10 w-10 sm:hidden rounded-full hover:bg-blue-500">
          <button className="hover:bg-blue-500">
            <ListSVG />
          </button>
        </div>
        <span>Housechat.ai</span>
        <div className="h-10 w-10 sm:hidden rounded-full hover:bg-blue-500">
          <button>
            <ChatSVG />
          </button>
        </div>
      </div>
    </div>
  );
}
