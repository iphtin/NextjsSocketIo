import { Minimize2, UserRoundPlus, Ellipsis, Video, Volume2, MicOff, PhoneCall } from 'lucide-react';
import VideoContainer from './VideoContainer';

const CallOverlay = () => {

     // Function to get the first letter of the username
     const getInitial = (name: string | null): string => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <div
            className="w-[400px] h-full rounded-lg p-6 bg-cover bg-center relative text-white"
            style={{ backgroundImage: 'url(https://i.pinimg.com/564x/d3/6b/cc/d36bcceceaa1d390489ec70d93154311.jpg)' }}
        >
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top section: Call info */}
                <div className="flex justify-between items-center mb-4">
                    <button className="bg-gray-600 bg-opacity-80 rounded-full p-2 text-white hover:bg-gray-500 transition">
                        <Minimize2 />
                    </button>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold">Fathi Macalin Iftin Maclin</h2>
                        <p className="text-sm text-green-400">Ringing...</p>
                    </div>
                    <button className="bg-gray-600 bg-opacity-80 rounded-full p-2 text-white hover:bg-gray-500 transition">
                        <UserRoundPlus />
                    </button>
                </div>

                {/* Center section: Caller avatar */}
                <div className="flex items-center justify-center mb-6">
                    {/* <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-white text-3xl">
                        {getInitial('Fathi')}
                    </div> */}
                    {/* <VideoContainer /> */}
                </div>

                {/* Bottom section: Action buttons */}
                <div className="w-full flex justify-around items-center bg-gray-700 bg-opacity-60 p-3 rounded-lg">
                    <button className="bg-gray-700 bg-opacity-80 rounded-full p-3 text-white hover:bg-gray-600 transition">
                        <Ellipsis />
                    </button>
                    <button className="bg-gray-700 bg-opacity-80 rounded-full p-3 text-white hover:bg-gray-600 transition">
                        <Video />
                    </button>
                    <button className="bg-gray-700 bg-opacity-80 rounded-full p-3 text-white hover:bg-gray-600 transition">
                        <Volume2 />
                    </button>
                    <button className="bg-gray-700 bg-opacity-80 rounded-full p-3 text-white hover:bg-gray-600 transition">
                        <MicOff />
                    </button>
                    <button className="p-4 bg-red-600 text-white rounded-full hover:bg-red-500 transition">
                        <PhoneCall />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallOverlay;
